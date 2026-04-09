"use client";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import styles from "./tools.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
  
  const onEnter = ()=>{
    return
  }

  const handleFilter = (category: string) => {
    setFilter(category);
    router.push(pathname + "?" + createQueryString("filter", category));
  };
  return (
    <div className={styles.tools}>
      <section className={styles.header}>
         <h1 className={styles.header_title}>รายการอุปกรณ์</h1>
        <SearchBar borderFocus={true} placeholder="ค้นหาอุปกรณ์ที่คุณต้องการ" value={search} setValue={setSearch} onEnter={onEnter}></SearchBar>
      </section>
    </div>
  );
};

export default ToolsClient;
