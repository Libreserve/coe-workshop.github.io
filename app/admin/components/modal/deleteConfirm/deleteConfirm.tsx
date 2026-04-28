import styles from "./deleteConfirm.module.scss";
import { DeleteConfirmProps } from "./deleteConfirm.types";
import { TextInput } from "@/app/components/Form/TextInput/TextInput";
import { useState } from "react";
import { useDeleteToolMutation } from "@/app/lib/features/tools/toolsApiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/Context/Toast/ToastProvider";

interface ErrorResponse {
  error?: string;
}

export const DeleteConfirm = ({
  onClose,
  confirmMessage,
  toolId,
}: DeleteConfirmProps) => {
  const router = useRouter();
  const [repeatAfter, setRepeatAfter] = useState<string>("");
  const [deleteTool, { isLoading }] = useDeleteToolMutation();
  const [errors, setErrors] = useState({ name: "", api: "" });
  const { addToastStack } = useToast();
  const handleOnDelete = async () => {
    setErrors((prev) => ({ ...prev, name: "", api: "" }))
    if (typeof toolId === "undefined") {
      return;
    }
    if (repeatAfter !== confirmMessage) {
      setErrors((prev) => ({
        ...prev,
        name: "กรุณาพิมพ์ชื่อเครื่องมือให้ถูกต้อง",
      }));
      return;
    }
    try {
      await deleteTool({ toolId: Number(toolId) }).unwrap();
      router.push("/admin/tools");
      addToastStack(
        "ลบเครื่องมือสำเร็จ",
        "เลขครุภัณฑ์จะถูกลบไปอย่างถาวร ประวัติหรือข้อมูลอื่นๆ ที่เกี่ยวข้องจะไม่สามารถย้อนกลับได้อีก",
        "success",
      );
      onClose();
    } catch (error) {
      let errMessage = "something went wrong";
      const err = error as FetchBaseQueryError;
      if (err.data && typeof err.data === "object" && "error" in err.data) {
        errMessage = (err.data as ErrorResponse).error || errMessage;
      }
      setErrors((prev) => ({ ...prev, api: errMessage }));
    }
  };

  return (
    <div className={styles.deleteConfirm}>
      <div className={styles.header}>
        <h2>ยืนยันการลบเครื่องมือ</h2>
        <p>
          เครื่องมือจะถูกลบไปอย่างถาวร ประวัติหรือข้อมูลอื่นๆ
          ที่เกี่ยวข้องจะไม่สามารถย้อนกลับได้อีก กรุณาพิมพ์{" "}
          <span>{confirmMessage + " "}</span>
          เพื่อยืนยันการลบ
        </p>
      </div>
      <form
        action=""
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleOnDelete();
        }}
      >
        <TextInput
          onChange={(value) => setRepeatAfter(value)}
          label="ชื่อเครื่องมือ"
          placeholder="ระบุชื่อเครื่องมือ"
          require
          value={repeatAfter}
          errorMessage={errors.name}
        ></TextInput>

        {errors.api && (
          <span className={styles.errorMessage}>
            ไม่สามารถสร้างรายการได้ : {errors.api}
          </span>
        )}
        <div className={styles.action}>
          <button
            className={styles.cancel}
            disabled={isLoading}
            onClick={() => onClose()}
          >
            ยกเลิก
          </button>
          <button
            className={styles.confirm}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "กำลังลบรายการ..." : "ลบรายการ"}
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};
