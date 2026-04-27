"use client";

import { TagInput } from "@/app/admin/components/ui/TagInput/TagInput";
import { DeleteConfirm } from "@/app/admin/components/modal/deleteConfirm/deleteConfirm";
import ModalContainer from "@/app/components/ModalContainer/modalContainer";
import { OptionsAction } from "@/app/admin/components/ui/optionAction/optionsAction";
import { TimeTransaction } from "@/app/admin/components/ui/timeTransaction/timeTransaction";
import useDisclosure from "@/app/hook/useDisclosure";
import { ItemTransaction } from "@/app/admin/components/ui/itemTransaction/itemTransaction";
import { Tabs } from "@/app/admin/components/ui/Tabs/Tabs";
import { TabsOption } from "@/app/admin/components/ui/Tabs/Tabs.type";
import React, { useState, useRef } from "react";
import { Options } from "@/app/admin/components/ui/optionAction/types";
import styles from "./AdminToolDetail.module.scss";
import { useParams } from "next/navigation";
import {
  useGetToolQuery,
  useCreateAssetMutation,
} from "@/app/lib/features/tools/toolsApiSlice";
import { useGetReservedByItemQuery } from "@/app/lib/features/admin/transactionsApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import CreateItem from "@/app/admin/components/modal/create_item/create";
import { getCategoryDisplay, toToolCategory } from "@/app/lib/features/tools/category.utils";
import { Calendar } from "@/app/components/Calendar/Calendar";
import { isAdminRoute } from "@/app/utils/isAdminRoute";
import { useToast } from "@/app/Context/Toast/ToastProvider";
import { useGetMeQuery } from "@/app/lib/features/admin/authApi";
import { getLoginUrl } from "@/app/lib/api";
import Link from "next/link";
import SvgIconMono from "@/app/components/Icon/SvgIconMono";
import { ErrorResponse } from "@/app/lib/features/tools/tools.type";
import Image from "next/image";

const AdminToolDetail= () => {
  const params = useParams<{ slug: string }>();
  const toolId = params.slug;
  const {
    data: fetchTool,
    isError,
    error: fetchToolError,
  } = useGetToolQuery(Number(toolId), { refetchOnMountOrArgChange: false });
  const tool = fetchTool;
  let fetchToolErrorMessage = "เกิดข้อผิดพลาดที่เซิฟเวอร์ กรุณาลองใหม่ในภายหลัง";
  if (fetchToolError && "data" in fetchToolError) {
    const err = fetchToolError as FetchBaseQueryError;
    if (err.data && typeof err.data === "object" && "error" in err.data) {
      fetchToolErrorMessage = (err.data as ErrorResponse).error || "";
    }
  }

  const { opened, handle } = useDisclosure();
  const { opened: openedAssetId, handle: handleAssetId } = useDisclosure();
  const { opened: createItem, handle: handlecreateItem } = useDisclosure();
  const [isList, setIsList] = useState(isAdminRoute);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const effectiveDate = new Date().toISOString().split("T")[0];
  const {
    data,
    isError: isAssetsError,
    isLoading: isLoadingAssets,
  } = useGetReservedByItemQuery({ itemId: Number(toolId), date: effectiveDate }, { skip: !toolId });

  const tagInputRef = useRef<{ getValues: () => string[] }>(null);
  const [createAsset, { isLoading: isCreatingAsset }] = useCreateAssetMutation();

  const handleSubmitAssets = async () => {
    if (!tagInputRef.current) return;

    const assetIDs = tagInputRef.current.getValues();
    if (assetIDs.length === 0) return;

    try {
      await createAsset({
        itemID: Number(toolId),
        assetID: assetIDs,
      }).unwrap();
      handleAssetId.close();
      addToastStack(
        "สร้างครุภัณฑ์สำเร็จ",
        "ครุภัณฑ์ถูกเพิ่มไปยังฐานข้อมูลเรียบร้อยแล้ว",
        "success"
      )
    } catch (err) {
      addToastStack(
        "สร้างครุภัณฑ์สำเร็จ",
        "เกิดข้อผิดพลาดในการสร้างครุภัณฑ์",
        "error"
      )
    }
  };

  const handleEditItem = () => {
    handlecreateItem.open();
  };

  const [options] = useState<Options[]>([
    { title: "แก้ไขเพิ่มเติม", action: handleEditItem },
    { title: "เพิ่มเลขครุภัณฑ์", action: handleAssetId.open },
    { title: "ลบเครื่องมือ", action: handle.open },
  ]);
  const tabsOptions: TabsOption[] = [
    {
      options: "ลิสต์",
      icon: `/admin/icon/book.svg`,
      isSelect: isList,
      action: () => {
        setIsList(true);
      },
    },
    {
      options: "ตาราง",
      icon: `/admin/icon/align-left.svg`,
      isSelect: !isList,
      action: () => setIsList(false),
    },
  ];

  const selectedDateString = selectedDate
    ? selectedDate.toLocaleDateString('en-CA')
    : new Date().toLocaleDateString('en-CA');

  const itemData = Array.isArray(data) ? data[0] : data;
  const { addToastStack } = useToast();
  const { data: user, isLoading } = useGetMeQuery();

  return (
    <div>
      {isError ? (
        <div>
          <h1>ไม่พบหน้าที่ต้องการค้นหา</h1>
          <div>{fetchToolErrorMessage}</div>
        </div>
      ) : (
        <div>
          <div className={styles.topSection}>
	  {tool?.imageUrl &&
	    <div className={styles.imageContainer}>
	      <img
	        src={tool.imageUrl}
	        alt={tool.name}
	        className={styles.image}
	        />
	    </div>
	  }
            <section className={styles.info}>
              <div className={styles.header}>
                <div className={styles.title}>
                  <h1>{tool?.name}</h1>
                  <p className={styles.category}>{tool?.category ? getCategoryDisplay(toToolCategory(tool.category)!) : ""}</p>
                </div>
                <div className={styles.action}>
                  <OptionsAction options={options} lastDelete={true}>
                    <SvgIconMono
                      src={"/admin/icon/dot.svg"}
                      width={24}
                      height={24}
                      alt="editIcon"
                    ></SvgIconMono>
                  </OptionsAction>
                </div>
              </div>
              <p className={styles.description}>{tool?.description}</p>
            </section>
            <section className={styles.datePickerSection}>
              <Calendar
                onChange={(date) => setSelectedDate(date)}
                value={selectedDate}
                isCasual={true}
		columnGap={8}
              />
            </section>
          </div>
          <section>
            <Tabs TabsOptions={tabsOptions}></Tabs>
            {!user && !isLoading ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateContent}>
                  <Link className={styles.emptyStateTitle} href={getLoginUrl()}>กรุณาเข้าสู่ระบบ</Link>
                  <p className={styles.emptyStateDescription}>คุณต้องเข้าสู่ระบบเพื่อขอใช้งานเครื่องมือ</p>
                </div>
              </div>
            ) : (
              isList ? (
                <ItemTransaction toolId={Number(toolId)} date={selectedDateString}></ItemTransaction>
              ) : (
                <TimeTransaction toolId={Number(toolId)} date={selectedDateString}></TimeTransaction>
              ))}
          </section>
          <ModalContainer
            opened={openedAssetId}
            onClose={() => handleAssetId.close()}
          >
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                e.preventDefault()
              }
              className={styles.assetId}
            >
              <div className={styles.assetId_header}>
                <h2 className={styles.assetId_title}>เพิ่มหมายเลขครุภัณฑ์</h2>
                <p>
                  เพิ่มเครื่องมือที่มีเลขครุภัณฑ์ที่อนุญาตให้ผู้ใช้ทั่วไปสามารถทำการยืมได้
                  โดยสามารถเพิ่มได้หลายรายการโดยการกดปุ่ม --ENTER--
                  และจะไม่สามารถนำเครื่องมือนั้นออกจากระบบได้หากมีผู้ใช้งานอยู่
                </p>
              </div>
              <TagInput ref={tagInputRef} placeholder="ป้อนเลขครุภัณฑ์ของเครื่องมือ"></TagInput>
              <div className={styles.assetId_action}>
                <button
                  onClick={() => handleAssetId.close()}
                  type="button"
                  className={styles.assetId_cancel}
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  className={styles.assetId_submit}
                  onClick={handleSubmitAssets}
                  disabled={isCreatingAsset}
                >
                  {isCreatingAsset ? "กำลังเพิ่ม..." : "ยืนยัน"}
                </button>
              </div>
            </form>
          </ModalContainer>
          <ModalContainer opened={opened} onClose={() => handle.close()}>
            <DeleteConfirm
              onClose={() => handle.close()}
              confirmMessage={tool ? tool.name : ""}
              toolId={tool?.id}
            ></DeleteConfirm>
          </ModalContainer>
          <ModalContainer
            opened={createItem}
            onClose={() => handlecreateItem.close()}
          >
            <CreateItem
              onClose={() => handlecreateItem.close()}
              onCreated={() => { }}
              value={{
                id: Number(toolId),
                name: itemData?.name,
                description: itemData?.description,
                imageUrl: itemData?.imageUrl,
                category: itemData?.category.name,
                categoryID: itemData?.category.id,
                assets_id: null,
              }}
            ></CreateItem>
          </ModalContainer>
        </div>
      )}
    </div>
  );
};

export default AdminToolDetail;
