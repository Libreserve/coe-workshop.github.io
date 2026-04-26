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

  const { data: toolTransaction, isLoading, isError, isFetching } = useGetAllTransactionsByStatusQuery({
    status: statusQuery,
    page: pageQuery,
    ...(dateQuery && { date: dateQuery }),
    ...(userNameQuery && { userName: userNameQuery }),
  });

  return (
    <div>
      <div className={styles.filter}>
        <h2>ประวัติการจองเครื่องมือ</h2>
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

      <AdminTransaction
        message={message}
        onChange={setMessage}
        onSubmit={() => {}}
        responseStatus={responseStatus}
        setResponseStatus={setResponseStatus}
	toolTransaction={toolTransaction}
	isError={isError}
	isLoading={isLoading}
	isFetching={isFetching}
      />
    </div>
  );
};
