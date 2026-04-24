"use client";
import { useToast } from "@/app/Context/Toast/ToastProvider";
import { ErrorResponse, ToolCategories } from "@/app/lib/features/admin/tool.typs";
import {
  useCreateToolMutation,
  useUpdateToolMutation,
} from "@/app/lib/features/tools/toolsApiSlice";
import { getAllCategories, getCategoryThaiName } from "@/app/lib/features/tools/category.utils";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useState } from "react";
import { addImageSvg_Dark } from "@/app/admin/components/Icon/SvgIcon";
import SvgIconMono from "@/app/components/Icon/SvgIconMono";
import { AreaInput } from "@/app/components/Form/AreaInput/AreaInput";
import { Select } from "@/app/components/Select/Select";
import { TextInput } from "@/app/components/Form/TextInput/TextInput";
import styles from "./create.module.scss";
import { CreateItemProps } from "./types";
function CreateItem({ onClose, value }: CreateItemProps) {
  const [name, setName] = useState(value?.name || "");
  const [description, setDescription] = useState(value?.description || "");
  const [category, setCategory] = useState<ToolCategories | undefined>(
    value?.category,
  );
  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    [key: string]: "compressing" | "done" | "error";
  }>({});
  const [tempFiles, setTempFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState({ api: "", name: "", category: "" });
  const { addToastStack } = useToast();
  const [createTools] = useCreateToolMutation();
  const [updateTool] = useUpdateToolMutation();
  const formatFilename = (name: string, containerWidth = 290) => {
    const maxLength = Math.floor(containerWidth / 10);
    if (name.length <= maxLength) return name;

    const ext = name.substring(name.lastIndexOf("."));
    const slicedName = name.substring(0, maxLength - ext.length - 3);

    return `${slicedName}...${ext}`;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    const duplicates = files.filter(
      (file) =>
        images.some((f) => f.name === file.name) ||
        tempFiles.some((f) => f.name === file.name),
    );

    const newFiles = files.filter(
      (file) =>
        !images.some((f) => f.name === file.name) &&
        !tempFiles.some((f) => f.name === file.name),
    );

    if (duplicates.length > 0) {
      setTempFiles((prev) => [...prev, ...duplicates]);

      const errorStatus: typeof uploadStatus = {};
      duplicates.forEach((file) => {
        errorStatus[file.name] = "error";
      });
      setUploadStatus((prev) => ({ ...prev, ...errorStatus }));
    }

    if (newFiles.length === 0) {
      e.target.value = "";
      return;
    }

    const newStatus: typeof uploadStatus = {};
    newFiles.forEach((file) => (newStatus[file.name] = "compressing"));
    setUploadStatus((prev) => ({ ...prev, ...newStatus }));

    e.target.value = "";

    setTempFiles((prev) => [...prev, ...newFiles]);

    await new Promise((resolve) => setTimeout(resolve, 0));

    const processedFiles: File[] = [];
    for (const file of newFiles) {
      try {
        const options = {
          maxSizeMB: 10,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        processedFiles.push(
          new File([compressedFile], file.name, { type: file.type }),
        );

        setUploadStatus((prev) => ({
          ...prev,
          [file.name]: "done",
        }));
      } catch {
        setUploadStatus((prev) => ({
          ...prev,
          [file.name]: "error",
        }));
      }
    }

    setImages((prev) => [...prev, ...processedFiles]);
  };

  const handleRemoveFile = (fileName: string) => {
    setTempFiles((prev) => prev.filter((f) => f.name !== fileName));

    setImages((prev) => prev.filter((f) => f.name !== fileName));

    setUploadStatus((prev) => {
      const newStatus = { ...prev };
      delete newStatus[fileName];
      return newStatus;
    });
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: "",
      category: "",
      api: "",
    };

    if (!name.trim()) {
      newErrors.name = "กรุณากรอกชื่อเครื่องมือ";
    }

    if (!category) {
      newErrors.category = "กรุณาเลือกหมวดหมู่";
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.category;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!category) {
      return;
    }

    setSubmitting(true);

    addToastStack(
      "กำลังอัปโหลด",
      "กำลังอัปโหลดข้อมูลเครื่องมือ กรุณารอสักครู่...",
      "warning",
    );

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("categoryName", category);

    if (images.length > 0) {
      formData.append("image", images[0]);
    }

    if (value) {
      try {
        await updateTool({ id: value.id, formData }).unwrap();

        setName("");
        setDescription("");
        setImages([]);
        setTempFiles([]);
        setUploadStatus({});

        addToastStack(
          "อัปเดตเครื่องมือสำเร็จ",
          "เครื่องมือถูกอัปเดตไปยังฐานข้อมูลเรียบร้อยแล้ว",
          "success",
        );
        onClose();
      } catch (error) {
        let updateErrorMessage = "";
        const err = error as FetchBaseQueryError;
        if (err.data && typeof err.data === "object" && "message" in err.data) {
          updateErrorMessage =
            (err.data as ErrorResponse).message || "something went wrong";
        }
        setErrors((prev) => ({
          ...prev,
          api: updateErrorMessage,
        }));

        addToastStack(
          "อัปเดตเครื่องมือไม่สำเร็จ",
          updateErrorMessage || "เกิดข้อผิดพลาดในการอัปเดตเครื่องมือ",
          "error",
        );
      } finally {
        setSubmitting(false);
      }
      return;
    }

    try {
      await createTools(formData).unwrap();

      setName("");
      setDescription("");
      setImages([]);
      setTempFiles([]);
      setUploadStatus({});

      addToastStack(
        "สร้างเครื่องมือสำเร็จ",
        "เครื่องมือถูกเพิ่มไปยังฐานข้อมูล ชื่อ รูป และคำอธิบายจะแสดงให้ผู้ใช้งานทราบ",
        "success",
      );
      onClose();
    } catch (error) {
      let createErrorMessage = "";
      const err = error as FetchBaseQueryError;
      if (err.data && typeof err.data === "object" && "message" in err.data) {
        createErrorMessage =
          (err.data as ErrorResponse).message || "something went wrong";
      }
      setErrors((prev) => ({
        ...prev,
        api: createErrorMessage,
      }));

      addToastStack(
        "สร้างเครื่องมือไม่สำเร็จ",
        createErrorMessage || "เกิดข้อผิดพลาดในการสร้างเครื่องมือ",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <div className={styles.formSection}>
              <h2>{value ? "อัปเดตเครื่องมือ" : "สร้างเครื่องมือรายการใหม่"}</h2>
              <p>หรือข้อมูล และตารางข้อมูลสำหรับจัดการหมวดหมู่ของโปรเจกต์</p>

              <div className={styles.field}>
                <TextInput
                  label="ชื่อเครื่องมือ"
                  placeholder="ระบุชื่อเครื่องมือ"
                  require
                  value={name}
                  onChange={setName}
                  errorMessage={errors.name}
                ></TextInput>
              </div>

              <div className={styles.field}>
                <AreaInput
                  label="คำอธิบาย"
                  value={description}
                  onChange={setDescription}
                  placeholder="ระบุคำอธิบาย"
                ></AreaInput>
              </div>

              <div className={styles.field}>
                <Select
                  placeholder="กรุณาเลือกหมวดหมู่"
                  onTop
                  label="หมวดหมู่"
                  require
                  errorMessage={errors.category}
                  value={category}
                  onChange={setCategory}
                  options={getAllCategories().map((c) => ({
                    label: getCategoryThaiName(c),
                    value: c,
                  }))}
                ></Select>
              </div>
            </div>

            <div className={styles.rightSection}>
              <div
                className={`${
                  tempFiles.length === 0
                    ? styles.imageBox
                    : styles.imageBoxPreview
                }`}
              >
                {tempFiles.length === 0 ? (
                  <>
                    <div>
                      <Image
                        src={`/admin/create-item/upload.svg`}
                        alt="upload"
                        width={80}
                        height={80}
                        className={styles.image}
                      />
                      <p className={styles.uploadText}>
                        <span>เลือกไฟล์ภาพ </span>ของคุณเพื่ออัพโหลด
                      </p>
                      <p className={styles.text_size}>รองรับขนาดสูงสุด 10 MB</p>
                    </div>

                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      disabled={submitting}
                      className={styles.imageFileMain}
                      aria-label="เลือกรูปภาพ"
                    />
                  </>
                ) : (
                  <div>
                    <div className={styles.fileList}>
                      {tempFiles.map((file, index) => {
                        const isError = uploadStatus[file.name] === "error";
                        return (
                          <div
                            key={index}
                            className={`${styles.blog} ${
                              isError
                                ? styles.error
                                : styles[uploadStatus[file.name]] || ""
                            }`}
                          >
                            <div className={styles.detail}>
                              <Image
                                src={
                                  uploadStatus[file.name] === "error"
                                    ? `/admin/create-item/error.svg`
                                    : `/admin/create-item/image.svg`
                                }
                                width={30}
                                height={30}
                                alt="error-image"
                              />
                              <div className={styles.text}>
                                <p className={styles.text_picDetail}>
                                  {formatFilename(file.name)}
                                </p>
                                <p
                                  className={`${styles.status} ${
                                    uploadStatus[file.name] === "error"
                                      ? styles.error
                                      : ""
                                  }`}
                                >
                                  {uploadStatus[file.name] === "compressing" &&
                                    "กำลังบีบอัดไฟล์..."}
                                  {uploadStatus[file.name] === "done" &&
                                    "อัปโหลดเสร็จสิ้น"}
                                  {uploadStatus[file.name] === "error" &&
                                    "Error message"}
                                </p>
                              </div>
                            </div>
                            <div onClick={() => handleRemoveFile(file.name)}>
                              <SvgIconMono
                                src={"/create-item/close.svg"}
                                width={10}
                                height={10}
                                alt="close-button"
                                className={styles.removeButton}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <label htmlFor="image-upload" className={styles.button}>
                      <span dangerouslySetInnerHTML={{ __html: addImageSvg_Dark }} className={styles.image} />
                      <p className={styles.uploadText}>อัพโหลดรูปภาพ</p>
                    </label>

                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      disabled={submitting}
                      className={styles.imageFile}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>

              {errors.api && (
                <span className={styles.errorMessage}>
                  ไม่สามารถสร้างรายการได้ : {errors.api}
                </span>
              )}

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  disabled={submitting}
                  onClick={() => onClose()}
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={submitting}
                >
                  {submitting ? "กำลังบันทึก..." : "บันทึก"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateItem;
