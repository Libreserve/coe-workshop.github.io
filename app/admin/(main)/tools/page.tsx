"use client";

import { ItemBlog } from "../../components/ui/ItemBlog/ItemBlog";
import { useGetToolsQuery } from "@/app/lib/features/admin/toolsAdminApi";
import { useRouter } from "next/navigation";
import Loader from "../../components/layout/loader/loader";
import { Tool } from "@/app/lib/features/admin/tool.typs";
import styles from "./tools.module.scss";

const Tools = () => {
  const { data: toolsInfo, isLoading, isError } = useGetToolsQuery();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.loadingContainer}>
        <p>เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>อุปกรณ์ทั้งหมด</h2>
      </div>
      <div className={styles.tools}>
        {toolsInfo?.map((t: Tool) => (
          <div
            onClick={() => router && router.push(`/admin/tools/${t.id}`)}
            key={t.id}
          >
            <ItemBlog
              key={t.id}
              id={t.id}
              name={t.name}
              description={t.description ?? ""}
              avaliable={0}
              quatity={0}
              imageUrl={t.imageUrl ?? ""}
            ></ItemBlog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;