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
import React, { useState } from "react";
import { Options } from "@/app/admin/components/ui/optionAction/types";
import styles from "./tool.module.scss";
import SvgIconMono from "@/app/components/Icon/SvgIconMono";
import { useParams } from "next/navigation";
import { useGetToolQuery } from "@/app/lib/features/admin/toolsAdminApi";
import { Tool } from "@/app/lib/features/admin/tool.typs";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import CreateItem from "@/app/admin/components/modal/create_item/create";

interface ErrorResponse {
  error?: string;
}

const ToolDetail = () => {
  const params = useParams<{ slug: string }>();
  const toolId = params.slug;
  const {
    data: fetchTool,
    isError,
    error: fetchToolError,
  } = useGetToolQuery(Number(toolId), { refetchOnMountOrArgChange: false });
  const tool = fetchTool;
  let fetchToolErrorMessage = "everything was fine";
  if (fetchToolError && "data" in fetchToolError) {
    const err = fetchToolError as FetchBaseQueryError;
    if (err.data && typeof err.data === "object" && "error" in err.data) {
      fetchToolErrorMessage = (err.data as ErrorResponse).error || "";
    }
  }

  const { opened, handle } = useDisclosure();
  const { opened: openedAssetId, handle: handleAssetId } = useDisclosure();
  const { opened: createItem, handle: handlecreateItem } = useDisclosure();
  const [isList, setIsList] = useState(true);
  const handleEditItem = () => {
    handlecreateItem.open();
  };

  const [options] = useState<Options[]>([
    { title: "แก้ไขเพิ่มเติม", action: handleEditItem },
    { title: "เพิ่มเลขครุภัณฑ์", action: handleAssetId.open },
    { title: "ลบอุปกรณ์", action: handle.open },
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

  return (
    <div>
      {isError ? (
        <div>
          <h1>ไม่พบหน้าที่ต้องการค้นหา</h1>
          <div>error: {fetchToolErrorMessage}</div>
        </div>
      ) : (
        <div>
          <section className={styles.info}>
            <div className={styles.header}>
              <div className={styles.title}>
                <h1>{tool?.name}</h1>
                <p className={styles.category}>{tool?.category ?? ""}</p>
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
          <section>
            <Tabs TabsOptions={tabsOptions}></Tabs>
            {isList ? (
              <ItemTransaction toolId={Number(toolId)}></ItemTransaction>
            ) : (
              <TimeTransaction toolId={Number(toolId)}></TimeTransaction>
            )}
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
                  เพิ่มอุปกรณ์ที่มีเลขครุภัณฑ์ที่อนุญาตให้ผู้ใช้ทั่วไปสามารถทำการยืมได้
                  โดยสามารถเพิ่มได้หลายรายการโดยการกดปุ่ม --ENTER--
                  และจะไม่สามารถนำอุปกรณ์นั้นออกจากระบบได้หากมีผู้ใช้งานอยู่
                </p>
              </div>
              <TagInput placeholder="ป้อนเลขครุภัณฑ์ของอุปกรณ์"></TagInput>
              <div className={styles.assetId_action}>
                <button
                  onClick={() => handleAssetId.close()}
                  type="button"
                  className={styles.assetId_cancel}
                >
                  ยกเลิก
                </button>
                <button type="button" className={styles.assetId_submit}>
                  ยืนยัน
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
              onCreated={() => {}}
            ></CreateItem>
          </ModalContainer>
        </div>
      )}
    </div>
  );
};

export default ToolDetail;