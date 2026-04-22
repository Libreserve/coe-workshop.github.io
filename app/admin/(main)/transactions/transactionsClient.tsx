"use client";

import SearchBar from "@/app/components/SearchBar/SearchBar";
import { Select } from "@/app/components/Select/Select";
import DatePicker from "@/app/components/Datepicker/Datepicker";
import { AdminTransaction } from "../../components/ui/adminTransaction/adminTransaction";
import { Status } from "@/app/types/api/transaction";
import { useState } from "react";
import styles from "./transaction.module.scss";
import { ResponseStatus } from "../../components/ui/adminTransaction/adminTransaction.type";
import { useSetQuery } from "@/app/hook/SearchQuery";
import { toISODateStringOrNull } from "@/app/utils/ISODateStringHandle";

export const Transaction = () => {
  const setQuery = useSetQuery();
  const [Search, setSearch] = useState<string>("");
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>(
    ResponseStatus.Approve,
  );
  const [message, setMessage] = useState<string>("");
  const hadleStutusChange = () => {};
  const [statusFilter, setStatusFilter] = useState<Status | undefined>(
    undefined,
  );

  const handleDateChange = (newDate: Date | null | undefined) => {
    newDate?.setDate(newDate.getDate() + 1);
    setQuery("date", toISODateStringOrNull(newDate));
    newDate?.setDate(newDate.getDate() - 1);
  };
  return (
    <div>
      <div className={styles.filter}>
        <h2>ประวัติการจองอุปกรณ์</h2>
        <div className={styles.filter_action}>
          <div className="">
            <SearchBar
              value={Search}
              setValue={setSearch}
              placeholder="ตัวกรองค้นหา"
	      size="sm"
            ></SearchBar>
          </div>
          <DatePicker
            placeholder="ค้นหาจากวันที่"
            required={true}
            onChange={handleDateChange}
	    disableLabel={true}
          ></DatePicker>
          <Select
            placeholder="ตัวกรองสถานะ"
            onChange={(newValue) => {
              setStatusFilter(newValue as unknown as Status | undefined);
              setQuery("status", newValue);
            }}
            value={statusFilter as unknown as string}
            options={["Approved", "Pending", "Finished", "Rejected", "Cancel", "Blank"]}
	    size="sm"
          ></Select>
        </div>
      </div>

      <AdminTransaction
        message={message}
        onChange={setMessage}
        onSubmit={hadleStutusChange}
        responseStatus={responseStatus}
        setResponseStatus={setResponseStatus}
      ></AdminTransaction>
    </div>
  );
};
