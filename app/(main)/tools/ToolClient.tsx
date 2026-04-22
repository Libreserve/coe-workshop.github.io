"use client";

import SearchBar from "@/app/components/SearchBar/SearchBar";
import { ItemBlog } from "@/app/components/ItemBlog/ItemBlog";
import styles from "./tools.module.scss";
import statusStyles from "./tools.status.module.scss";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useGetToolsQuery } from "@/app/lib/features/tools/toolsApiSlice";
import { ToolCategories } from "@/app/lib/features/tools/tools.type";
import { getAllCategories, getCategoryDisplay } from "@/app/lib/features/tools/category.utils";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Select } from "@/app/components/Select/Select";
import Loader from "@/app/admin/components/layout/loader/loader";

interface ErrorResponse {
  message?: string;
  error?: string;
}

const ToolsClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || "",
  );
  const [category, setCategory] = useState<ToolCategories | undefined>(
    searchParams.get("category") as ToolCategories | undefined,
  );

  const {
    data: tools,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetToolsQuery({
    category: category,
    search: search || undefined,
  });

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    const currentCategory = searchParams.get("category") as ToolCategories | undefined;
    setSearch(currentSearch);
    setCategory(currentCategory);
  }, [searchParams]);

  const updateFilters = useCallback((newSearch: string, newCategory: ToolCategories | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSearch) {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }

    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }

    router.push(`/tools?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const getErrorMessage = (error: unknown): string => {
    if (typeof error === "object" && error !== null) {
      const fetchError = error as FetchBaseQueryError;
      if (fetchError.data && typeof fetchError.data === "object") {
        const data = fetchError.data as ErrorResponse;
        return data.message || data.error || "เกิดข้อผิดพลาดในการโหลดข้อมูล";
      }
      if (fetchError.status === "FETCH_ERROR") {
        return "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต";
      }
      if (fetchError.status === 500) {
        return "เซิร์ฟเวอร์มีปัญหา กรุณาลองใหม่อีกครั้งในภายหลัง";
      }
      if (fetchError.status === 404) {
        return "ไม่พบข้อมูลที่ต้องการ";
      }
    }
    return "เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง";
  };

  const getErrorDetails = (error: unknown): string | null => {
    if (typeof error === "object" && error !== null) {
      const fetchError = error as FetchBaseQueryError;
      if (fetchError.status && fetchError.status !== "FETCH_ERROR") {
        return `รหัสข้อผิดพลาด: ${fetchError.status}`;
      }
    }
    return null;
  };

  return (
    <div className={styles.tools}>
      <section className={styles.header}>
        <h1 className={styles.header_title}>อุปกรณ์ทั้งหมด</h1>
        <div className={styles.filterRow}>
          <SearchBar
            borderFocus={true}
            placeholder="ค้นหาอุปกรณ์ที่คุณต้องการ"
            value={search}
            setValue={(value) => {
              setSearch(value);
              updateFilters(value, category);
            }}
          />
          <Select
            value={category ? getCategoryDisplay(category) : undefined}
            onChange={(value) => {
              const displayValue = value as string;
              const newCategory = displayValue === "ทั้งหมด"
                ? undefined
                : (displayValue.split(" ")[0] as ToolCategories);
              
              setCategory(newCategory);
              updateFilters(search, newCategory);
            }}
            options={["ทั้งหมด", ...getAllCategories().map(getCategoryDisplay)]}
            placeholder="เลือกหมวดหมู่"
          />
        </div>
      </section>

      {isLoading && (
        <div className={statusStyles.loadingContainer}>
	<Loader />
          <p className={statusStyles.loadingText}>กำลังโหลดข้อมูล...</p>
        </div>
      )}

      {isError && (
        <div className={statusStyles.errorContainer}>
          <span className={statusStyles.errorIcon}>⚠️</span>
          <h3 className={statusStyles.errorTitle}>ไม่สามารถโหลดข้อมูลได้</h3>
          <p className={statusStyles.errorMessage}>{getErrorMessage(error)}</p>
          {getErrorDetails(error) && (
            <p className={statusStyles.errorDetails}>{getErrorDetails(error)}</p>
          )}
          <button
            onClick={handleRetry}
            className={statusStyles.retryButton}
            type="button"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      )}

      {!isLoading && !isError && tools && tools.length === 0 && (
        <div className={statusStyles.emptyContainer}>
          <span className={statusStyles.emptyIcon}>📭</span>
          <h3 className={statusStyles.emptyTitle}>ไม่พบอุปกรณ์</h3>
          <p className={statusStyles.emptyDescription}>
            {search
              ? `ไม่พบอุปกรณ์ที่ตรงกับ "${search}" กรุณาลองค้นหาด้วยคำอื่น`
              : "ยังไม่มีอุปกรณ์ในระบบ"}
          </p>
        </div>
      )}

      {!isLoading && !isError && tools && tools.length > 0 && (
        <div className={styles.toolGrid}>
          {tools.map((tool) => (
            <ItemBlog
              key={tool.id}
              id={tool.id}
              name={tool.name}
              description={tool.description || ""}
              imageUrl={tool.image || ""}
              avaliable={tool.quantity || 0}
              quatity={tool.quantity || 0}
              category={tool.category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolsClient;
