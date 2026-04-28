"use client";

import SvgIconMono from "@/app/components/Icon/SvgIconMono";
import { useState } from "react";
import { StatusTag } from "../statusTag/statusTag";
import styles from "./itemTransaction.module.scss";
import { useGetReservedByItemQuery } from "@/app/lib/features/admin/transactionsApi";
import Loader from "@/app/admin/components/layout/loader/loader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AdminStatus, ErrorResponse } from "@/app/types/api/transaction";
import { formatDateThai, formatDateTime, formatHourMinute } from "@/app/utils/dateTime";
import Image from "next/image";
import { useDeleteAssetMutation } from "@/app/lib/features/tools/toolsApiSlice";
import { useToast } from "@/app/Context/Toast/ToastProvider";
import { isAdminRoute } from "@/app/utils/isAdminRoute";

export const ItemTransaction = ({ toolId = 0, date }: { toolId?: number; date?: string }) => {
  const [openTransaction, setOpenTransaction] = useState<number[]>([]);
  const [closeTransaction, setCloseTransaction] = useState<number[]>([]);

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

  const {
    data,
    isError,
    error,
    isFetching,
  } = useGetReservedByItemQuery({ itemId: toolId, date });

  let toolTransactionErrorMessage = "There's some error occuring while try to fetch the transaction data";
  if (error && "data" in error) {
    const err = error as FetchBaseQueryError;
    if (err.data && typeof err.data === "object" && "error" in err.data) {
      toolTransactionErrorMessage = (err.data as ErrorResponse).error || "";
    }
  }

  const itemData = Array.isArray(data) ? data[0] : data;
  const assetsToItems = itemData?.assetsToItems ?? [];
  const assets = assetsToItems.map((item: any) => {
    const rawTransactions = item.asset?.transactions ?? [];
    const sortedTransactions = [...rawTransactions].sort((a, b) => {
        return new Date(a.endedAt).getTime() - new Date(b.endedAt).getTime();
    });

    return {
      id: item.assetID,
      assetNumber: item.asset?.assetID,
      transactions: sortedTransactions,
    }});

  const [deleteAsset] = useDeleteAssetMutation();
  const { addToastStack } = useToast();
  // const [anyTransaction, setAnyTransaction] = useState<boolean>(false);

  // useEffect(() => {
  //   const hasTransactions = assets.some(asset => asset.transactions.length > 0);
  //   setAnyTransaction(hasTransactions);
  // }, [assets]);

  const handleDeleteAsset = async (id: number) => {
    try {
      await deleteAsset({ id }).unwrap();
      addToastStack(
	"ลบครุภัณฑ์สำเร็จ",
	"ข้อมูลครุภัณฑ์ถูกลบจากฐานข้อมูลเรียบร้อยแล้ว",
	"success",
      );
    } catch (error) {
      let errorMessage = "";
      const err = error as FetchBaseQueryError;
      if (err.data && typeof err.data === "object" && "error" in err.data) {
	errorMessage =
	  (err.data as ErrorResponse).error || "เกิดข้อผิดพลาดในการลบครุภัณฑ์";
      }
      addToastStack(
	"ลบครุภัณฑ์ไม่สำเร็จ",
	errorMessage || "เกิดข้อผิดพลาดในการลบครุภัณฑ์",
	"error",
      );
    }
  }

  if (assets.length === 0) 
    return <>
	     <div className={styles.loadingContainer}>
	       <Image
                 src={"/transaction/empty-rafiki.svg"}
                 alt={""}
                 width={300}
                 height={300}
	         className={styles.empty}
               />
	       <p className={styles.loadingText}>ไม่มีครุภัณฑ์{isAdminRoute() && "คลิกที่ปุ่ม 3 จุดข้างชื่อเครื่องมือเพื่อสร้างครุภัณฑ์"}</p>
	     </div>
	   </>

  return (
    <div className={styles.item_transaction}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <th className={styles.toggle}></th>
            <th className="">เลขครุภัณฑ์</th>
            <th>ผู้ยืม</th>
            <th className={styles.header_status}>สถานะ</th>
            <th className={styles.header_time}>เวลา</th>
            <th className={styles.header_message}>คำร้อง</th>
            <th className={styles.header_action}></th>
          </tr>
        </thead>
        <tbody>
          {isFetching && (
            <tr>
              <td colSpan={7}>
                <div className={styles.loadingContainer}>
                  <Loader></Loader>
                  <p className={styles.loadingText}>กำลังโหลดข้อมูล...</p>
                </div>
              </td>
            </tr>
          )}
          {!isFetching && (
            assets.map((asset: any, assetIndex: number) => {
	      return asset.transactions.length === 0 ? (
                <tr className={styles.firstItem} key={assetIndex}>
                  <td
                    className={styles.toggle}
                    onClick={() => toggleTransaction(assetIndex)}
                  />
                  <td colSpan={2} className={styles.assetNumber}>{asset.assetNumber}</td>
		  <td colSpan={3} className={styles.status}>
		    <StatusTag status={AdminStatus.Blank}></StatusTag>
		  </td>
                  <td className={styles.trashSpace}>
                    <button onClick={() => handleDeleteAsset(asset.id)}>
                      <SvgIconMono
                        className={styles.trashIcon}
                        src={`/icon/trash.svg`}
                        width={20}
                        height={20}
                        alt="trash"
                      ></SvgIconMono>
                    </button>
                  </td>
                </tr>
	      ) : (
              asset.transactions?.map((txn: any, txIndex: number) =>
                txIndex === 0 ? (
                  <tr className={styles.firstItem} key={`${assetIndex}-${txIndex}`}>
                    <td
                      className={styles.toggle}
                      onClick={() => toggleTransaction(assetIndex)}
                    >
                      <div
                        style={{
                          transform: openTransaction.includes(assetIndex)
                            ? ""
                            : "rotate(-90deg)",
                        }}
                      >
                        <SvgIconMono
                          className={styles.toggle_image}
                          src={`/icon/arrow.svg`}
                          alt="arrow"
                          width={15}
                          height={15}
                        ></SvgIconMono>
                      </div>
                    </td>
                    <td className={styles.assetNumber}>{asset.assetNumber}</td>
                    <td className={styles.username}>{txn.reserver.userName}</td>
                    <td className={styles.status}>
                      <StatusTag status={txn.status}></StatusTag>
                    </td>
                    <td className={styles.time}>
		      <div className={styles.timeRange}>
			<span>{formatDateThai(txn.startedAt)}:</span>
		        <span>{formatHourMinute(txn.startedAt)}</span>
                        <span className={styles.timeDash}>-</span>
                        <span>{formatHourMinute(txn.endedAt)}</span>
		      </div>
		    </td>
                    <td className={styles.message}>{txn.messages?.[0].detail ?? "-"}</td>
                    <td className={styles.trashSpace}>
                      <button onClick={() => handleDeleteAsset(asset.id)}>
                        <SvgIconMono
                          className={styles.trashIcon}
                          src={`/icon/trash.svg`}
                          width={20}
                          height={20}
                          alt="trash"
                        ></SvgIconMono>
                      </button>
                    </td>
                  </tr>
                ) : (
                  openTransaction.includes(assetIndex) && (
                    <tr
                      className={`${styles.oldTransaction} ${closeTransaction.includes(assetIndex)
                        ? styles.slideOut
                        : styles.slideIn
                        }`}
                      key={`${assetIndex}-${txIndex}`}
                    >
                      <td></td>
                      <td className={styles.assetNumber}>{asset.assetNumber}</td>
                      <td className={styles.username}>{txn.userName}</td>
                      <td className={styles.status}>
                        <StatusTag status={txn.status}></StatusTag>
                      </td>
		      <td className={styles.time}>
		        <div className={styles.timeRange}>
		          <span>{formatDateThai(txn.startedAt)}:</span>
		          <span>{formatHourMinute(txn.startedAt)}</span>
                          <span className={styles.timeDash}>-</span>
                          <span>{formatHourMinute(txn.endedAt)}</span>
		        </div>
		      </td>
                      <td className={styles.message}>{txn.message ?? "-"}</td>
                      <td></td>
                    </tr>
                  )
                )
              )
            )}))}
          {isError && (
            <tr>
              <td colSpan={7}>
                <div className={styles.error}>
                  error: {toolTransactionErrorMessage}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
