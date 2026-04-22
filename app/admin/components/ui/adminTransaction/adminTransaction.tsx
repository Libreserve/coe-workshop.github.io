"use client";

import useDisclosure from "@/app/hook/useDisclosure";
// import { mockAdminTableTransactions } from "@/app/mockdata/mockdata";
import React, { useState } from "react";
import SvgIconMono from "@/app/components/Icon/SvgIconMono";
import { StatusTag } from "@/app/admin/components/ui/statusTag/statusTag";
import { Tooltip } from "@/app/admin/components/ui/tooltip/tooltip";
import styles from "./adminTrasaction.module.scss";
import { AreaInput } from "@/app/components/Form/AreaInput/AreaInput";
import { AdminTransactionProps, ResponseStatus } from "./adminTransaction.type";
import ModalContainer from "@/app/components/ModalContainer/modalContainer";
import { useGetAllTransactionsByStatusQuery, useUpdateTransactionStatusMutation } from "@/app/lib/features/admin/transactionsApi";
import { useSearchParams } from "next/navigation";
import { ErrorResponse } from "@/app/types/api/transaction";
import { useScrollToRightEnd } from "@/app/hook/useScrollToRightEnd";

type ISODateString = string;

export const AdminTransaction = ({
  message,
  onChange,
  onSubmit,
  responseStatus,
  setResponseStatus,
}: AdminTransactionProps) => {
  const [openTransaction, setOpenTransaction] = useState<number[]>([]);
  const [closeTransaction, setCloseTransaction] = useState<number[]>([]);
  const { opened, handle } = useDisclosure();

  // ใช้ param => /tranactions?item=__
  const searchParams = useSearchParams();
  const itemQuery = parseInt(searchParams.get("item") || "0", 10);
  const userQuery = searchParams.get("user") || "";
  const dateQuery = searchParams.get("date") as ISODateString;
  const pageQuery = parseInt(searchParams.get("page") || "1", 10);

  const { data: toolTransaction, isLoading, isError, isFetching } = useGetAllTransactionsByStatusQuery({
    status: "RESERVE",
    page: pageQuery,
  });

  const { scrollRef, isScrolledToRightEnd, handleScroll } = useScrollToRightEnd<HTMLDivElement>([toolTransaction]);

  const toggleTransaction = (idx: number) => {
    if (openTransaction.includes(idx)) {
      setCloseTransaction((prev) => [...prev, idx]);
      setTimeout(() => {
        setOpenTransaction((prev) => prev.filter((item) => item !== idx));
        setCloseTransaction((prev) => prev.filter((item) => item !== idx));
      }, 300);
    } else {
      setOpenTransaction((prev) => [...prev, idx]);
    }
  };

  const [errorUpdateStatus, setErrorUpdateStatus] = useState<string | null>(null);
  const [selectedTxId, setSelectedTxId] = useState<number | null>(null);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateTransactionStatusMutation();

  const handleModalSubmit = async () => {
    try {
      const isApproved = responseStatus !== ResponseStatus.Reject;

      await updateStatus({
        transactionId: selectedTxId!,
        isApproved: isApproved,
        message: message,
      }).unwrap();

      handle.close();
      onChange("");
      setSelectedTxId(null);
      if (onSubmit) onSubmit();

    } catch (err: unknown) {
      const rtkError = err as { data?: ErrorResponse };

      if (rtkError?.data?.error) {
        setErrorUpdateStatus(rtkError.data.error);
      } else {
        setErrorUpdateStatus("เกิดข้อผิดพลาดในการทำรายการ กรุณาลองใหม่อีกครั้ง");
      }
    }
  };

  const formatHourMinute = (iso: string): string => {
    return new Date(iso).toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleImmediateApprove = async (transactionId: number) => {
    try {
      await updateStatus({
        transactionId: transactionId,
        isApproved: true,
        message: "",
      }).unwrap();
      if (onSubmit) onSubmit();
    } catch (err: unknown) {
      const rtkError = err as { data?: ErrorResponse };
      if (rtkError?.data?.error) {
        setErrorUpdateStatus(rtkError.data.error);
      } else {
        setErrorUpdateStatus("เกิดข้อผิดพลาดในการอนุมัติ กรุณาลองใหม่อีกครั้ง");
      }
    }
  };

  return (
    <div 
      className={`${styles.tableWrapper} ${isScrolledToRightEnd ? styles.isAtRightEnd : ""}`}
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <table className={styles.table}>
        <colgroup>
          <col className={styles.itemName} />
          <col className={styles.assetID} />
          <col className={styles.status} />
          <col className={styles.endTime} />
          <col className={styles.message} />
          <col className={styles.action} />
        </colgroup>

        <thead>
          <tr className={styles.header}>
            <th>ชื่ออุปกรณ์</th>
            <th>เลขครุภัณฑ์</th>
            <th>สถานะ</th>
            <th>เวลาสิ้นสุด</th>
            <th>คำร้อง</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {(isLoading || isFetching) ? (
            <tr>
              <td colSpan={6} className={styles.tableCellLoading}>
                กำลังโหลดข้อมูล...
              </td>
            </tr>
          ) : (
          isError ? (
            <tr>
              <td colSpan={6} className={styles.tableCellError}>
                เกิดข้อผิดพลาดในการดึงข้อมูล
              </td>
            </tr> 
          ) : (
            toolTransaction?.users?.map((userGroup: any, userIndex: number) => (
              <React.Fragment key={userIndex}>
                <tr className={styles.userRow}>
                  <td colSpan={1}>
                    <div 
                      className={styles.userInfo}
                      onClick={() => toggleTransaction(userIndex)}>
                      <div
                        className={`${styles.userArrow} ${
                          openTransaction.includes(userIndex)
                            ? styles.userArrowOpen
                            : styles.userArrowClosed
                        }`}
                      >
                        <SvgIconMono
                          src={`/icon/arrow.svg`}
                          width={15}
                          height={15}
                          alt="arrowDown"
                        ></SvgIconMono>
                      </div>
                      <Tooltip title={userGroup.user?.phone}>
                        <div className={styles.usernameBadge}>
                          <span className={styles.username}>{userGroup.user?.userName}</span>
                        </div>
                      </Tooltip>
                    </div>
                  </td>
                  <td colSpan={5}>
                    <button
                      onClick={() => {
                        setSelectedTxId(null);
                        setResponseStatus(ResponseStatus.ApproveAll);
                        handle.open();
                      }}
                      className={styles.allApprove}
                      type="button"
                    >
                      อนุมัติทั้งหมด
                    </button>
                  </td>
                </tr>

                {userGroup.adminTransactions?.map((transaction: any, transactionIndex: number) => 
                openTransaction.includes(userIndex) && (
                  <tr
                    key={transactionIndex}
                    className={`${styles.transactionRow}  ${
                      closeTransaction.includes(userIndex)
                        ? styles.slideOut
                        : styles.slideIn
                    }`}
                  >
                    <td className={styles.itemNameText}>{transaction.itemName ?? "N/A"}</td>
                    <td className={styles.assetsText}>{transaction.assetID ?? "N/A"}</td>
                    <td className={styles.status}>
                      <StatusTag status={transaction.status} />
                    </td>
                    <td className={styles.endTime}>
                      {formatHourMinute(transaction.endedAt)}
                    </td>
                    <td className={styles.message}>{transaction.message ?? "no message attach"}</td>
                    <td className={styles.stickyAction}>
                      <div className={styles.action_content}>
                          <button
                           className={styles.action_pointer}
                           onClick={() => {
                             handleImmediateApprove(transaction.id);
                           }}
                          disabled={isUpdating}
                          type="button"
                        >
                          <SvgIconMono
                            className={styles.action_content_check}
                            src={`/icon/double-check.svg`}
                            width={20} height={20} alt="check"
                          />
                        </button>
                        <div
                          className={styles.action_pointer}
                          onClick={() => {
                            setSelectedTxId(transaction.id);
                            setResponseStatus(ResponseStatus.Reject);
                            handle.open();
                          }}
                        >
                          <SvgIconMono
                            className={styles.action_content_stop}
                            src={`/icon/stop.svg`}
                            width={20} height={20} alt="stop"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </React.Fragment>
            ))
          ))
        }
        </tbody>
      </table>
      <ModalContainer opened={opened} onClose={handle.close}>
        <div className={styles.response}>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleModalSubmit();
            }}
          >
            <div className={styles.response_header}>
              <h2 className={styles.response_title}>
                {responseStatus === ResponseStatus.Reject
                  ? "ไม่อนุมัติคำร้อง"
                  : responseStatus === ResponseStatus.ApproveAll
                  ? "ยืนยันการอนุมัติทั้งหมด"
                  : "ยืนยันการอนุมัติ"}
              </h2>
              <p className={styles.response_description}>
                สามารถทิ้งข้อความถึงผู้จองให้ทราบ เกี่ยวกับการจองอุปกรณ์ได้
              </p>
              <div className={styles.response_input}>
                <AreaInput
                  value={message}
                  onChange={onChange}
                  placeholder={
                    responseStatus === ResponseStatus.Reject
                      ? "ระบุสาเหตุที่ไม่อนุมัติการจอง..."
                      : "ทิ้งข้อความสั้นๆ ถึงผู้จอง (ไม่บังคับ)..."
                  }
                ></AreaInput>
              </div>
              <div className={styles.response_action}>
                {errorUpdateStatus && (
                  <div className={styles.response_error}>
                    {errorUpdateStatus}
                  </div>
                )}
                <button 
                  type="button" 
                  className={styles.response_close} 
                  onClick={() => { handle.close(); onChange(""); setErrorUpdateStatus(null);}}
                  disabled={isUpdating} // กันกดตอนโหลด
                >
                  ปิด
                </button>
                <button 
                  className={`${styles.response_submit} ${errorUpdateStatus ? styles.error_response_submit : ""}`} 
                  type="submit"
                  disabled={isUpdating}
               >
                 {isUpdating ? "กำลังบันทึก..." : "ยืนยัน"}
               </button>
              </div>
            </div>
          </form>
        </div>
      </ModalContainer>
    </div>
  );
};
