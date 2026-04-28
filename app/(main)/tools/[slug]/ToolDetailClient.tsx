"use client";

import ModalContainer from "@/app/components/ModalContainer/modalContainer";
import { TimeTransaction } from "@/app/admin/components/ui/timeTransaction/timeTransaction";
import useDisclosure from "@/app/hook/useDisclosure";
import { useState } from "react";
import styles from "./ToolDetail.module.scss";
import { useParams } from "next/navigation";
import { useGetToolQuery } from "@/app/lib/features/tools/toolsApiSlice";
import { useCreateTransactionMutation, useGetReservedByItemQuery } from "@/app/lib/features/admin/transactionsApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { getCategoryThaiName, toToolCategory } from "@/app/lib/features/tools/category.utils";
import { Calendar } from "@/app/components/Calendar/Calendar";
import { Select } from "@/app/components/Select/Select";
import { useToast } from "@/app/Context/Toast/ToastProvider";
import { useGetMeQuery } from "@/app/lib/features/admin/authApi";
import { getLoginUrl } from "@/app/lib/api";
import Link from "next/link";
import { formatWeekDateThai } from "@/app/utils/dateTime";

interface ErrorResponse {
  error?: string;
}

const TIME_OPTIONS = Array.from({ length: 15 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return { label: `${hour.toString().padStart(2, "0")}:${minute}`, value: `${hour.toString().padStart(2, "0")}:${minute}` };
});

const convertLocalTimeToUTC = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const now = new Date();
  const localDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  const utcHours = localDate.getUTCHours().toString().padStart(2, "0");
  const utcMinutes = localDate.getUTCMinutes().toString().padStart(2, "0");
  return `${utcHours}:${utcMinutes}`;
};

const ToolDetailClient = () => {
  const params = useParams<{ slug: string }>();
  const toolId = params.slug;
  const {
    data: fetchTool,
    isError,
    error: fetchToolError,
  } = useGetToolQuery(Number(toolId), { refetchOnMountOrArgChange: false });
  const tool = fetchTool;
  let fetchToolErrorMessage = "เกิดข้อผิดพลาดที่เซิฟเวอร์ กรุณาลองใหม่ในภายหลัง";
  if (fetchToolError && "data" in fetchToolError) {
    const err = fetchToolError as FetchBaseQueryError;
    if (err.data && typeof err.data === "object" && "error" in err.data) {
      fetchToolErrorMessage = (err.data as ErrorResponse).error || "";
    }
  }

  const { opened: openedReservation, handle: handleReservation } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [reservationStartTime, setReservationStartTime] = useState("");
  const [reservationEndTime, setReservationEndTime] = useState("");
  const [reservationMessage, setReservationMessage] = useState("");
  const [reservationError, setReservationError] = useState<string | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<string>("");
  const effectiveDate = new Date().toISOString().split("T")[0];
  const {
    data,
    isError: isAssetsError,
    isLoading: isLoadingAssets,
  } = useGetReservedByItemQuery({ itemId: Number(toolId), date: effectiveDate }, { skip: !toolId });

  const [createTransaction, { isLoading: isCreatingTransaction }] = useCreateTransactionMutation();

  const handleReservationSubmit = async () => {
    if (!reservationStartTime || !reservationEndTime) {
      setReservationError("กรุณาเลือกเวลาเริ่มต้นและเวลาสิ้นสุด");
      return;
    }
    if (!reservationMessage.trim()) {
      setReservationError("กรุณาระบุวัตถุประสงค์");
      return;
    }
    if (reservationStartTime >= reservationEndTime) {
      setReservationError("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น");
      return;
    }

    try {
      setReservationError(null);
      await createTransaction({
        assetID: Number(selectedAssetId),
        itemID: Number(toolId),
        date: selectedDateString,
        startedAt: convertLocalTimeToUTC(reservationStartTime),
        endedAt: convertLocalTimeToUTC(reservationEndTime),
        message: reservationMessage,
      }).unwrap();
      handleReservation.close();
      setReservationStartTime("");
      setReservationEndTime("");
      setReservationMessage("");
      setSelectedAssetId("");
      addToastStack(
        "ขอใช้งานเครื่องมือสำเร็จ",
        "คำขอถูกส่งไปยังฐานข้อมูลเรียบร้อยแล้ว",
        "success",
      );
    } catch (err) {
      const error = err as FetchBaseQueryError;
      if (error.data && typeof error.data === "object" && "error" in error.data) {
        setReservationError((error.data as { error?: string }).error || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      } else {
        setReservationError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
      addToastStack(
        "ขอใช้งานเครื่องมือไม่สำเร็จ",
        reservationError || "เกิดข้อผิดพลาดในการขอใช้งานเครื่องมือ",
        "error",
      );
    }
  };

  const openReservation = () => {
    setReservationStartTime("");
    setReservationEndTime("");
    setReservationMessage("");
    setReservationError(null);
    handleReservation.open();
  };

  const selectedDateString = selectedDate
    ? selectedDate.toLocaleDateString('en-CA')
    : new Date().toLocaleDateString('en-CA');

  const itemData = Array.isArray(data) ? data[0] : data;

  const assetsToItems = itemData?.assetsToItems ?? [];
  const assets = assetsToItems.map((item: any) => ({
    id: item.assetID,
    assetNumber: item.asset?.assetID,
  }));
  const { addToastStack } = useToast();
  const { data: user, isLoading } = useGetMeQuery();

  return (
    <div>
      {isError ? (
        <div>
          <h1>ไม่พบหน้าที่ต้องการค้นหา</h1>
          <div>{fetchToolErrorMessage}</div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.topSection}>
            <section className={styles.info}>
              {tool?.imageUrl &&
                <div className={styles.imageContainer}>
                  <img
                    src={tool.imageUrl}
                    alt={tool.name}
                    className={styles.image}
                  />
                </div>
              }
              <div className={styles.header}>
                <div className={styles.title}>
                  <h1>{tool?.name}</h1>
                  <p className={styles.category}>{tool?.category ? getCategoryThaiName(toToolCategory(tool.category)!) : ""}</p>
                </div>
              </div>
              <p className={styles.description}>{tool?.description}</p>
	      <button className={`${styles.requestButton} ${styles.mobile}`} onClick={openReservation}>
		ขอใช้งานเครื่องมือ
	      </button>
            </section>
            <section>
	      <div className={styles.datePickerSection}>
                <Calendar
                  onChange={(date) => setSelectedDate(date)}
                  value={selectedDate}
                  isCasual={true}
                />
	      </div>
	      <button className={`${styles.requestButton} ${styles.desktop}`} onClick={openReservation}>
                ขอใช้งานเครื่องมือ
              </button>
            </section>
          </div>
          <section className={styles.timeTrans}>
            {!user && !isLoading ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateContent}>
                  <Link className={styles.emptyStateTitle} href={getLoginUrl()}>กรุณาเข้าสู่ระบบ</Link>
                  <p className={styles.emptyStateDescription}>คุณต้องเข้าสู่ระบบเพื่อขอใช้งานเครื่องมือ</p>
                </div>
              </div>
            ) : (
              <div>
                <h1 className={styles.tableTitle}>ตารางเวลาขอใช้เครื่องมือ</h1>
                <TimeTransaction toolId={Number(toolId)} date={selectedDateString}></TimeTransaction>
              </div>
            )}
          </section>
          <ModalContainer
            opened={openedReservation}
            onClose={() => handleReservation.close()}
          >
            <div className={styles.reservationForm}>
              <div className={styles.reservationHeader}>
                <h2>ขอใช้งานเครื่องมือ</h2>
                <p className={styles.reservationToolName}>{tool?.name}</p>
              </div>
              <div className={styles.reservationFields}>
                <div className={styles.fieldGroup}>
                  <label>เลขครุภัณฑ์</label>
                  {isLoadingAssets ? (
                    <Select options={[]} value={selectedAssetId} onChange={(val) => setSelectedAssetId(val)} placeholder="กำลังโหลด..." />
                  ) : isAssetsError ? (
                    <Select options={[]} value={selectedAssetId} onChange={(val) => setSelectedAssetId(val)} placeholder="เกิดข้อผิดพลาด" />
                  ) : (
                    <Select
                      options={assets.map((asset: any) => ({ label: asset.assetNumber, value: asset.id }))}
                      value={selectedAssetId}
                      onChange={(val) => setSelectedAssetId(val)}
                      placeholder="เลือกเลขคุรุภัณฑ์"
                    />
                  )}
                </div>
                <div className={styles.fieldGroup}>
                  <label>วันที่</label>
                  <span className={styles.fieldValue}>{formatWeekDateThai(selectedDateString)}</span>
                </div>
                <div className={styles.fieldGroup}>
                  <label>เวลาเริ่มต้น</label>
                  <Select
                    options={TIME_OPTIONS}
                    value={reservationStartTime}
                    onChange={(val) => setReservationStartTime(val)}
                    placeholder="เลือกเวลาเริ่มต้น"
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label>เวลาสิ้นสุด</label>
                  <Select
                    options={TIME_OPTIONS}
                    value={reservationEndTime}
                    onChange={(val) => setReservationEndTime(val)}
                    placeholder="เลือกเวลาสิ้นสุด"
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="reservation-message">วัตถุประสงค์</label>
                  <textarea
                    id="reservation-message"
                    value={reservationMessage}
                    onChange={(e) => setReservationMessage(e.target.value)}
                    className={styles.messageInput}
                    rows={3}
                    placeholder="ระบุวัตถุประสงค์ในการขอใช้งาน"
                  />
                </div>
              </div>
              {reservationError && (
                <div className={styles.errorMessage}>{reservationError}</div>
              )}
              <div className={styles.reservationActions}>
                <button
                  className={styles.reservationCancel}
                  onClick={() => {
                    handleReservation.close();
                    setReservationStartTime("");
                    setReservationEndTime("");
                    setReservationMessage("");
                    setReservationError(null);
                  }}
                >
                  ยกเลิก
                </button>
                <button
                  className={styles.reservationSubmit}
                  onClick={handleReservationSubmit}
                  disabled={isCreatingTransaction}
                >
                  {isCreatingTransaction ? "กำลังส่งคำขอ..." : "ยืนยันการขอใช้"}
                </button>
              </div>
            </div>
          </ModalContainer>
        </div>
      )}
    </div>
  );
};

export default ToolDetailClient;
