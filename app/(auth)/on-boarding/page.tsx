"use client";

import { useSetState } from "@mantine/hooks";
import styles from "./on-boarding.module.scss";
import { TextInput } from "@/app/components/TextInput/TextInput";
import { useEffect, useState } from "react";
import { Select } from "@/app/components/Select/Select";

const OnBoarding = () => {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [prefixChoice] = useState<string[]>([
    "นาย",
    "นาง/นางสาว",
    "เด็กชาย",
    "เด็กหญิง",
  ]);
  const [prefix, setPrefix] = useState<string>("");
  const [majorChoice] = useState<string[]>([
    "คณะเกษตรศาสตร์",
    "คณะเทคโนโลยี",
    "คณะวิศวกรรมศาสตร์",
    "คณะวิทยาศาสตร์",
    "คณะสถาปัตยกรรมศาสตร์",
    "วิทยาลัยการคอมพิวเตอร์",
    "คณะพยาบาลศาสตร์",
    "คณะแพทยศาสตร์",
    "คณะเทคนิคการแพทย์",
    "คณะสาธารณสุขศาสตร์",
    "คณะทันตแพทยศาสตร์",
    "คณะเภสัชศาสตร์",
    "คณะสัตวแพทยศาสตร์",
    "คณะศึกษาศาสตร์",
    "คณะมนุษยศาสตร์และสังคมศาสตร์",
    "คณะบริหารธุรกิจและการบัญชี",
    "คณะศิลปกรรมศาสตร์",
    "คณะเศรษฐศาสตร์",
    "คณะนิติศาสตร์",
    "วิทยาลัยการปกครองท้องถิ่น",
    "วิทยาลัยนานาชาติ",
    "บุคคลภายนอก",
  ]);
  const [major, setMajor] = useState<string>("");
  return (
    <div className={styles.onBoarding}>
      <div className={styles.header}>
        <h2>ลงทะเบียนบัญชี</h2>
        <p>
          เพื่อให้บัญชีของท่านสมบูรณ์ในการบันทึกข้อมูลรูปแบบการจอง
          กรุณากรอกข้อมูลด้านล่างให้ครบถ้วนก่อนกดส่งแบบฟอร์ม
        </p>
      </div>
      <form className={styles.form} action="">
        <Select
          label="คำนำหน้า"
          onChange={setPrefix}
          placeholder="--กรุณาเลือกคำนำหน้า--"
          value={prefix}
          options={prefixChoice}
          require
        ></Select>
        <TextInput
          require={true}
          value={name}
          onChange={setName}
          title="ชื่อ"
          placeholder="กรอกชื่อของคุณ"
        ></TextInput>
        <TextInput
          require={true}
          value={lastname}
          onChange={setLastname}
          title="นามสกุล"
          placeholder="กรอกนามสกุลของคุณ"
        ></TextInput>
        <TextInput
          require={true}
          value={tel}
          onChange={setTel}
          title="เบอร์ติดต่อ"
          placeholder="0812345678"
        ></TextInput>
        <Select
          label="คณะ/วิทยาลัย"
          onChange={setMajor}
          placeholder="--กรุณาเลือกคณะ/วิทยาลัย--"
          value={major}
          options={majorChoice}
          require
        ></Select>
        <button type="submit" className={styles.register}>
          ลงทะเบียน
        </button>
      </form>
    </div>
  );
};

export default OnBoarding;
