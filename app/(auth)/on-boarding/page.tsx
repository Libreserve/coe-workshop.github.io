"use client";
import { Select } from "@/app/components/Select/Select";
import { TextInput } from "@/app/components/Form/TextInput/TextInput";
import { FormError } from "@/app/types/ui/form";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/app/lib/features/authApiSlice";
import { ToastContext } from "@/app/Context/Toast/ToastContext";
import { UserRoleEnum } from "@/app/lib/types";
import styles from "./on-boarding.module.scss";

const OnBoarding = () => {
  const router = useRouter();
  const toastContext = useContext(ToastContext);
  const [register, { isLoading }] = useRegisterMutation();

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

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^0[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const hadleSetPrefix = (newPrefix: string) => {
    setPrefix(newPrefix);
  };

  const validateForm = (): boolean => {
    const newErrors: FormError = {};

    if (!prefix) {
      newErrors.prefix = "กรุณาเลือกคำนำหน้า";
    }

    if (!name.trim()) {
      newErrors.name = "กรุณากรอกชื่อ";
    }

    if (!lastname.trim()) {
      newErrors.lastname = "กรุณากรอกนามสกุล";
    }

    if (!tel.trim()) {
      newErrors.tel = "กรุณากรอกเบอร์ติดต่อ";
    } else if (!validatePhone(tel)) {
      newErrors.tel = "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (ตัวอย่าง: 0812345678)";
    }

    if (!major) {
      newErrors.major = "กรุณาเลือกคณะ/วิทยาลัย";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const isUniStudent = major !== "บุคคลภายนอก";

    try {
      const result = await register({
        firstName: name.trim(),
        lastName: lastname.trim(),
        prefix: prefix,
        isUniStudent: isUniStudent,
        faculty: isUniStudent ? major : undefined,
        role: UserRoleEnum[0],
        phone: tel.trim(),
      }).unwrap();

      if (result.success) {
        toastContext?.addToastStack(
          "ลงทะเบียนสำเร็จ",
          "ยินดีต้อนรับเข้าสู่ระบบ",
          "success",
        );
        router.push("/landing");
      } else {
        toastContext?.addToastStack(
          "ลงทะเบียนไม่สำเร็จ",
          result.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
          "error",
        );
      }
    } catch {
      toastContext?.addToastStack(
        "ลงทะเบียนไม่สำเร็จ",
        "เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง",
        "error",
      );
    }
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
          onChange={(value) => hadleSetPrefix(value as string)}
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
          onChange={(value) => setMajor(value as string)}
          placeholder="--กรุณาเลือกคณะ/วิทยาลัย--"
          value={major}
          options={majorChoice}
          require
          onTop
          errorMessage={errors.major}
        ></Select>
        <button type="submit" className={styles.register} disabled={isLoading}>
          {isLoading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
        </button>
      </form>
    </div>
  );
};

export default OnBoarding;
