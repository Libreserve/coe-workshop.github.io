"use client";

import { TagInput } from "@/app/admin/components/ui/TagInput/TagInput";
import { DeleteConfirm } from "@/app/admin/components/modal/deleteConfirm/deleteConfirm";
import ModalContainer from "@/app/components/ModalContainer/modalContainer";
import { OptionsAction } from "@/app/admin/components/ui/optionAction/optionsAction";
import { TimeTransaction } from "@/app/admin/components/ui/timeTransaction/timeTransaction";
import useDisclosure from "@/app/hook/useDisclosure";
import { ItemTransaction } from "@/app/admin/components/ui/itemTransaction/itemTransaction";
import { Tabs } from "@/app/admin/components/ui/Tabs/Tabs";
import { TabsOption } from "@/app/admin/components/ui/Tabs/Tabs.type";
import React, { useState, useRef, useEffect } from "react";
import { Options } from "@/app/admin/components/ui/optionAction/types";
import styles from "./ToolDetail.module.scss";
import SvgIconMono from "@/app/components/Icon/SvgIconMono";
import { useParams } from "next/navigation";
import {
  useGetToolQuery,
  useCreateAssetMutation,
} from "@/app/lib/features/tools/toolsApiSlice";
import { useCreateTransactionMutation, useGetReservedByItemQuery } from "@/app/lib/features/admin/transactionsApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import CreateItem from "@/app/admin/components/modal/create_item/create";
import { getCategoryDisplay, toToolCategory } from "@/app/lib/features/tools/category.utils";
import { Calendar } from "@/app/components/Calendar/Calendar";
import { Select } from "@/app/components/Select/Select";
import { isAdminRoute } from "@/app/utils/isAdminRoute";
import { useToast } from "@/app/Context/Toast/ToastProvider";
import { useGetMeQuery } from "@/app/lib/features/admin/authApi";
import { getLoginUrl } from "@/app/lib/api";
import Link from "next/link";

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

const formatDateThai = (dateStr: string): string => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

  const { opened, handle } = useDisclosure();
  const { opened: openedAssetId, handle: handleAssetId } = useDisclosure();
  const { opened: createItem, handle: handlecreateItem } = useDisclosure();
  const { opened: openedReservation, handle: handleReservation } = useDisclosure();
  const [isList, setIsList] = useState(isAdminRoute);
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

  const tagInputRef = useRef<{ getValues: () => string[] }>(null);
  const [createAsset, { isLoading: isCreatingAsset }] = useCreateAssetMutation();
  const [createTransaction, { isLoading: isCreatingTransaction }] = useCreateTransactionMutation();

  const handleSubmitAssets = async () => {
    if (!tagInputRef.current) return;

    const assetIDs = tagInputRef.current.getValues();
    if (assetIDs.length === 0) return;

    try {
      await createAsset({
        itemID: Number(toolId),
        assetID: assetIDs,
      }).unwrap();
      handleAssetId.close();
      addToastStack(
	"สร้างครุภัณฑ์สำเร็จ",
	"ครุภัณฑ์ถูกเพิ่มไปยังฐานข้อมูลเรียบร้อยแล้ว",
	"success"
      )
    } catch (err) {
      addToastStack(
	"สร้างครุภัณฑ์สำเร็จ",
	"เกิดข้อผิดพลาดในการสร้างครุภัณฑ์",
	"error"
      )
    }
  };

  const handleEditItem = () => {
    handlecreateItem.open();
  };

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
      if (user === null || user === undefined) {
	console.log("ere")
	addToastStack(
	  "ขอใช้งานเครื่องมือไม่สำเร็จ",
	  "เกิดข้อผิดพลาดในการขอใช้งานเครื่องมือ",
	  "error",
	);
	return;
      }

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

  const [options] = useState<Options[]>([
    { title: "แก้ไขเพิ่มเติม", action: handleEditItem },
    { title: "เพิ่มเลขครุภัณฑ์", action: handleAssetId.open },
    { title: "ลบเครื่องมือ", action: handle.open },
  ]);
  const tabsOptions: TabsOption[] = [
    {
      options: "ลิสต์",
      icon: `/admin/icon/book.svg`,
      isSelect: isList,
      action: () => {
        setIsList(true);
      },
    },
    {
      options: "ตาราง",
      icon: `/admin/icon/align-left.svg`,
      isSelect: !isList,
      action: () => setIsList(false),
    },
  ];

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
        <div>
          <div className={styles.topSection}>
            <section className={styles.info}>
              <div className={styles.header}>
                <div className={styles.title}>
                  <h1>{tool?.name}</h1>
                  <p className={styles.category}>{tool?.category ? getCategoryDisplay(toToolCategory(tool.category)!) : ""}</p>
                </div>
                <div className={styles.action}>
                  {isAdminRoute && (
                    <OptionsAction options={options} lastDelete={true}>
                      <SvgIconMono
                        src={"/admin/icon/dot.svg"}
                        width={24}
                        height={24}
                        alt="editIcon"
                      ></SvgIconMono>
                    </OptionsAction>
                  )}
                </div>
              </div>
              <p className={styles.description}>{tool?.description}</p>
              {!isAdminRoute && (
                <button className={styles.requestButton} onClick={openReservation}>
                  ขอใช้งานเครื่องมือ
                </button>
              )}
            </section>
            <section className={styles.datePickerSection}>
              <Calendar
                onChange={(date) => setSelectedDate(date)}
                value={selectedDate}
                isCasual={true}
              />
            </section>
          </div>
          <section>
            <Tabs TabsOptions={tabsOptions}></Tabs>
	    {!user && !isLoading ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateContent}>
                  <Link className={styles.emptyStateTitle} href={getLoginUrl()}>กรุณาเข้าสู่ระบบ</Link>
                  <p className={styles.emptyStateDescription}>คุณต้องเข้าสู่ระบบเพื่อขอใช้งานเครื่องมือ</p>
                </div>
              </div>
	    ) : (
	      isList ? (
                <ItemTransaction toolId={Number(toolId)} date={selectedDateString}></ItemTransaction>
              ) : (
                <TimeTransaction toolId={Number(toolId)} date={selectedDateString}></TimeTransaction>
              ))}
          </section>
          <ModalContainer
            opened={openedAssetId}
            onClose={() => handleAssetId.close()}
          >
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                e.preventDefault()
              }
              className={styles.assetId}
            >
              <div className={styles.assetId_header}>
                <h2 className={styles.assetId_title}>เพิ่มหมายเลขครุภัณฑ์</h2>
                <p>
                  เพิ่มเครื่องมือที่มีเลขครุภัณฑ์ที่อนุญาตให้ผู้ใช้ทั่วไปสามารถทำการยืมได้
                  โดยสามารถเพิ่มได้หลายรายการโดยการกดปุ่ม --ENTER--
                  และจะไม่สามารถนำเครื่องมือนั้นออกจากระบบได้หากมีผู้ใช้งานอยู่
                </p>
              </div>
              <TagInput ref={tagInputRef} placeholder="ป้อนเลขครุภัณฑ์ของเครื่องมือ"></TagInput>
              <div className={styles.assetId_action}>
                <button
                  onClick={() => handleAssetId.close()}
                  type="button"
                  className={styles.assetId_cancel}
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  className={styles.assetId_submit}
                  onClick={handleSubmitAssets}
                  disabled={isCreatingAsset}
                >
                  {isCreatingAsset ? "กำลังเพิ่ม..." : "ยืนยัน"}
                </button>
              </div>
            </form>
          </ModalContainer>
          <ModalContainer opened={opened} onClose={() => handle.close()}>
            <DeleteConfirm
              onClose={() => handle.close()}
              confirmMessage={tool ? tool.name : ""}
              toolId={tool?.id}
            ></DeleteConfirm>
          </ModalContainer>
          <ModalContainer
            opened={createItem}
            onClose={() => handlecreateItem.close()}
          >
            <CreateItem
              onClose={() => handlecreateItem.close()}
              onCreated={() => { }}
              value={{
                id: Number(toolId),
                name: itemData?.name,
                description: itemData?.description,
                imageUrl: itemData?.imageUrl,
                category: itemData?.category.name,
                categoryID: itemData?.category.id,
                assets_id: null,
              }}
            ></CreateItem>
          </ModalContainer>
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
                  <span className={styles.fieldValue}>{formatDateThai(selectedDateString)}</span>
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
