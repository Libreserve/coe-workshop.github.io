"use client";

import { SearchBar } from "@/app/components/SearchBar/SearchBar";
import styles from "./tools.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Select } from "@/app/components/Select/Select";
import SvgIconMono from "@/app/components/Icon/SvgIconMono";
const ToolsClient = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPage = 10;
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || "",
  );
  const [filter, setFilter] = useState<string>(
    searchParams.get("filter") || "",
  );

  const categories = [
    "ELECTRONIC ⚡",
    "MECHANICAL 🔧",
    "ELECTRICAL 🔌",
    "PNEUMATIC 💨",
    "HYDRAULIC 🛢️",
    "MEASUREMENT 📏",
    "SOLDERING 🔥",
    "HAND TOOLS 🛠️",
    "POWER TOOLS ⚙️",
    "SAFETY 🦺",
    "ROBOTICS 🤖",
    "AUTOMATION 🏭",
    "PROTOTYPING 🧪",
    "3D PRINTING 🖨️",
    "CNC 🧱",
    "MAINTENANCE 🔩",
  ];

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name); // ถ้าค่าว่าง ให้ลบ param ออกจาก URL
      }
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    // ดึงค่าล่าสุดจาก URL
    const currentSearch = searchParams.get("search") || "";
    const currentFilter = searchParams.get("filter") || "";
    const currentPage = searchParams.get("page") || 1;
    // อัปเดต State ให้ตรงกับ URL (รองรับการกด Back/Forward)
    setCurrentPage(Number(currentPage));
    setSearch(currentSearch);
    setFilter(currentFilter);
  }, [searchParams]); // ใส่ searchParams เป็น dependency

  const handlePagination = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(pathname + "?" + createQueryString("page", String(newPage)));
  };

  const handleFilter = (category: string) => {
    setFilter(category);
    router.push(pathname + "?" + createQueryString("filter", category));
  };
  return (
    <div className={styles.tools}>
      <div className={styles.header}>
        <div className={styles.text}>
          <h1 className={styles.title}>
            {search
              ? "ผลการค้นหาสำหรับ " + `"` + search + `"`
              : "อุปกรณ์ทั้งหมด"}
          </h1>
          <h4 className={styles.description}>(ตรงกับที่ค้นหา n ชิ้น)</h4>
        </div>
        <div className={styles.filter}>
          <div className={styles.filter_name}>
            <SearchBar
              placeholder="ชื่อของอุปกรณ์"
              iconSize={18}
              searching={search}
              onEnter={(newValue) => {
                setSearch(newValue);
                router.push(
                  pathname + "?" + createQueryString("search", newValue),
                );
              }}
            ></SearchBar>
          </div>
          <Select
            value={filter}
            placeholder="Category"
            options={categories}
            onChange={(value) => handleFilter(value as string)}
            icon="/icon/funnel-simple.svg"
          ></Select>
        </div>
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.pagination_previous}
          disabled={currentPage == 1}
          onClick={() => {
            return router.push(
              pathname +
                "?" +
                createQueryString("page", String(currentPage - 1)),
            );
          }}
        >
          <SvgIconMono
            src="./icon/arrow.svg"
            width={14}
            height={14}
            alt="next"
          ></SvgIconMono>
        </button>
        <div className={styles.pagination_select}>
          <Select
            placeholder={String(currentPage)}
            value={currentPage}
            onChange={(page) => handlePagination(page as number)}
            options={Array.from({ length: totalPage }, (_, index) =>
              String(index + 1),
            )}
          ></Select>
        </div>
        <button
          className={styles.pagination_next}
          disabled={currentPage == totalPage}
          onClick={() => {
            return router.push(
              pathname +
                "?" +
                createQueryString("page", String(currentPage + 1)),
            );
          }}
        >
          <SvgIconMono
            src="./icon/arrow.svg"
            width={14}
            height={14}
            alt="next"
          ></SvgIconMono>
        </button>
      </div>
    </div>
  );
};

export default ToolsClient;
