"use client";
import { Select } from "@/app/components/Select/Select";
import { TextInput } from "@/app/components/TextInput/TextInput";
import { FormError } from "@/app/types/ui/form";
import { useState } from "react";
import styles from "./on-boarding.module.scss";

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
  const [errors, setErrors] = useState<FormError>({
    prefix: "",
    name: "",
    lastname: "",
    tel: "",
    major: "",
  });

  const handleSubmit = () => {
    setErrors({
      endpoint: "กรุณากรอกข้อมูล",
    });
  };
  return (
    <div className={styles.onBoarding}>
      <div className={styles.header}>
        <h2>ลงทะเบียนบัญชี</h2>
        <p>
          เพื่อให้บัญชีของท่านสมบูรณ์ในการบันทึกข้อมูลรูปแบบการจอง
          กรุณากรอกข้อมูลด้านล่างให้ครบถ้วนก่อนกดส่งแบบฟอร์ม
        </p>
      </div>
      <form
        className={styles.form}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Select
          label="คำนำหน้า"
          onChange={setPrefix}
          placeholder="--กรุณาเลือกคำนำหน้า--"
          value={prefix}
          options={prefixChoice}
          require
          errorMessage={errors.prefix}
        ></Select>
        <TextInput
          require={true}
          value={name}
          onChange={setName}
          title="ชื่อ"
          placeholder="กรอกชื่อของคุณ"
          errorMessage={errors.name}
        ></TextInput>
        <TextInput
          require={true}
          value={lastname}
          onChange={setLastname}
          title="นามสกุล"
          placeholder="กรอกนามสกุลของคุณ"
          errorMessage={errors.lastname}
        ></TextInput>
        <TextInput
          require={true}
          value={tel}
          onChange={setTel}
          title="เบอร์ติดต่อ"
          placeholder="0812345678"
          errorMessage={errors.tel}
        ></TextInput>
        <Select
          label="คณะ/วิทยาลัย"
          onChange={setMajor}
          placeholder="--กรุณาเลือกคณะ/วิทยาลัย--"
          value={major}
          options={majorChoice}
          require
          onTop
          errorMessage={errors.major}
        ></Select>
        <p className={styles.errorEndpoint}>{errors.endpoint}</p>
        <button type="submit" className={styles.register}>
          ลงทะเบียน
        </button>
      </form>
    </div>
  );
};

export default OnBoarding;
