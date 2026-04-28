"use client";

import SearchBar from "@/app/components/SearchBar/SearchBar";
import DatePicker from "@/app/components/Datepicker/Datepicker";
import { AdminTransaction } from "../../components/ui/adminTransaction/adminTransaction";
import { useState } from "react";
import styles from "./transaction.module.scss";
import { ResponseStatus } from "../../components/ui/adminTransaction/adminTransaction.type";
import { useSetQuery } from "@/app/hook/SearchQuery";
import { toISODateStringOrNull } from "@/app/utils/dateTime";
import { Select } from "@/app/components/Select/Select";
import type { SelectOption } from "@/app/components/Select/Select.types";
import { useSearchParams } from "next/navigation";
import { useGetAllTransactionsByStatusQuery } from "@/app/lib/features/admin/transactionsApi";
import { useGetMeQuery } from "@/app/lib/features/admin/authApi";
import Link from "next/link";
import { getLoginUrl } from "@/app/lib/api";

const statusOptions: SelectOption<string>[] = [
  { label: "รออนุมัติ", value: "RESERVE" },
  { label: "อนุมัติ", value: "APPROVE" },
  { label: "ปฏิเสธ", value: "REJECT" },
];

export const Transaction = () => {
  const setQuery = useSetQuery();
  const [searchInput, setSearchInput] = useState<string>("");
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>(
    ResponseStatus.Approve,
  );
  const [message, setMessage] = useState<string>("");

  const handleSearch = () => {
    if (searchInput.trim()) {
      setQuery("userName", searchInput.trim());
    } else {
      setQuery("userName", null);
    }
  };

  const handleDateChange = (newDate: Date | null | undefined) => {
    newDate?.setDate(newDate.getDate() + 1);
    setQuery("date", toISODateStringOrNull(newDate));
    newDate?.setDate(newDate.getDate() - 1);
  };

  // ใช้ param => /tranactions?item=__
  const searchParams = useSearchParams();
  const dateQuery = searchParams.get("date") as string;
  const pageQuery = parseInt(searchParams.get("page") || "1", 10);
  const statusQuery = searchParams.get("status") || "RESERVE";
  const userNameQuery = searchParams.get("userName") || "";

  const { data: toolTransaction, isError, isFetching } = useGetAllTransactionsByStatusQuery({
    status: statusQuery,
    page: pageQuery,
    ...(dateQuery && { date: dateQuery }),
    ...(userNameQuery && { userName: userNameQuery }),
  });
  const { data: user, isLoading: isLoadUser } = useGetMeQuery();

  return (
    <div>
      <div className={styles.filter}>
        <h1>อนุมัติการขอใช้งาน</h1>
        <div className={styles.filter_action}>
          <div className="">
            <SearchBar
              value={searchInput}
              setValue={setSearchInput}
              onEnter={handleSearch}
              placeholder="ค้นหาชื่อผู้ใช้"
              size="sm"
            />
          </div>
          <DatePicker
            placeholder="ค้นหาจากวันที่"
            required={true}
            onChange={handleDateChange}
            disableLabel={true}
	    isCasual={false}
          />
          <Select
            placeholder="ตัวกรองสถานะ"
            onChange={(value) => {
              setQuery("status", value || null);
            }}
            defaultValue="RESERVE"
            options={statusOptions}
            size="sm"
          />
        </div>
      </div>

      {!user && !isLoadUser ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateContent}>
            <Link className={styles.emptyStateTitle} href={getLoginUrl()}>กรุณาเข้าสู่ระบบ</Link>
            <p className={styles.emptyStateDescription}>คุณต้องเข้าสู่ระบบเพื่ออนุมัติการขอใช้งานเครื่องมือ</p>
          </div>
        </div>
      ) : (
	<AdminTransaction
      	  message={message}
      	  onChange={setMessage}
      	  onSubmit={() => {}}
      	  responseStatus={responseStatus}
      	  setResponseStatus={setResponseStatus}
      	  toolTransaction={toolTransaction}
      	  isError={isError}
      	  isFetching={isFetching}
      	/>
      )}
    </div>
  );
};
