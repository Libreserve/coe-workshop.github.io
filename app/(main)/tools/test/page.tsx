"use client";
import ModalSlice from "@/app/components/ModalSlide/ModalSlide";
import { Select } from "@/app/components/Select/Select";
import useDisclosure from "@/app/hook/useDisclosure";
import { useState } from "react";
import { AreaInput } from "@/app/components/AreaInput/AreaInput";
import styles from "./toolitem.module.scss";
import { FormError } from "@/app/types/ui/form";
import DatePicker from "@/app/components/Datepicker/Datepicker";
const Toolitem = () => {
  const [itemName] = useState<string>("Occaecat");
  const [category] = useState<string>("กระมงปรือ");
  const [description] = useState<string>(`
    Lorem ipsum dolor sit amet,
    consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud 
    `);
  const { opened, handle } = useDisclosure();
  const [assetIdOption] = useState<string[]>(["671455kku", "6l514j5kku"]);
  const [assetId, setAssetId] = useState<string>();
  const [timeOptions, setTimeOptions] = useState<string[]>([
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
  ]);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [object, setObject] = useState<string>("");
  const [formError, setFormError] = useState<FormError>({
    assetId: "",
    startTime: "",
    endTime: "",
    object: "",
  });

  const getStartTimeOptions = (): string[] => {
    let startTimeOptions = timeOptions.slice(0, -1);

    if (!endTime) {
      return startTimeOptions;
    }

    const pos = timeOptions.indexOf(endTime);
    return startTimeOptions.filter((_, index) => index < pos);
  };

  const getEndTimeOptions = (): string[] => {
    let endTimeOptions = timeOptions.slice(1);

    if (!startTime) {
      return endTimeOptions;
    }

    const pos = timeOptions.indexOf(startTime);
    return endTimeOptions.filter((_, index) => index + 1 > pos);
  };

  const handleSubmit = () => {
    console.log("form ");
  };

  return (
    <div className={styles.toolitem}>
      <ModalSlice onClose={handle.close} opened={opened}>
        <div className={styles.transaction}>
          <h2>แบบฟอร์มการจอง</h2>
          <p>
            การจองของคุณจะเริ่มต้นเมื่อผู้ดูแลได้อนุมัติคำร้องืย
            โปรดระบุจุดประสงค์ให้ชัดเจน เพื่อให้ง่ายต่อการตัดสินใจของผู้ดูแล
          </p>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault;
              handleSubmit();
            }}
            className={styles.form}
            action=""
          >
            <Select
              require
              onChange={setAssetId}
              value={assetId}
              options={assetIdOption}
              label="หมายเลขครุภัณฑ์"
              placeholder="--โปรดเลือกเลขครุภัณฑ์--"
              errorMessage=""
            ></Select>
            <div className={styles.form_calendar}>
              <DatePicker></DatePicker>
            </div>
            <div className={styles.form_time}>
              <Select
                require
                onChange={setStartTime}
                value={startTime}
                options={getStartTimeOptions()}
                label="เวลาเริ่มจอง"
                placeholder="--:--"
                errorMessage=""
              ></Select>
              <Select
                require
                onChange={setEndTime}
                value={endTime}
                options={getEndTimeOptions()}
                label="เวลาสิ้นสุด"
                placeholder="--:--"
                errorMessage=""
              ></Select>
            </div>

            <AreaInput
              require
              value={object}
              onChange={setObject}
              label="จุดประสงค์การจอง"
              placeholder="บอกจุดประสงค์การใช้งานเพื่อแจ้งให้ผู้ดูแลทราบ"
            ></AreaInput>
            <button className={styles.form_submit} type="submit">
              ยืนยันการจอง
            </button>
          </form>
        </div>
      </ModalSlice>
      <section className={styles.info}>
        <div className={styles.info_cover}></div>
        <div className={styles.info_title}>
          <h1 className={styles.info_itemname}>{itemName}</h1>
          <h4 className={styles.info_category}>{category}</h4>
        </div>
        <p>{description}</p>
      </section>
      <section className={styles.action}>
        <div className={styles.action_title}>
          <h2>ตารางการจอง</h2>
          <button
            onClick={() => handle.open()}
            type="button"
            className={styles.action_reserve}
          >
            จองอุปกรณ์นี้
          </button>
        </div>
      </section>
    </div>
  );
};

export default Toolitem;
