"use client";

import { SearchBar } from "@/app/components/SearchBar/SearchBar";
import styles from "./SearchItem.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Select } from "@/app/components/Select/Select";

const Tools = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState<string>(searchParams.get("search") || "");
  const [filter, setFilter] = useState<string>(searchParams.get("filter") || "");

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
    [searchParams]
  );
  
  useEffect(() => {
    // ดึงค่าล่าสุดจาก URL
    const currentSearch = searchParams.get("search") || "";
    const currentFilter = searchParams.get("filter") || "";
    // อัปเดต State ให้ตรงกับ URL (รองรับการกด Back/Forward)
    setSearch(currentSearch);
    setFilter(currentFilter);
    
  }, [searchParams]); // ใส่ searchParams เป็น dependency

  return (
    <div>
      <div className={styles.warpper}>
        <SearchBar 
        placeholder="ชื่อของอุปกรณ์" 
        iconSize={18}
        searching={search}
        onEnter={(newValue) => {
          setSearch(newValue);
          router.push(pathname + "?" + createQueryString("search", newValue));
        }}
        ></SearchBar>
        <Select  
          value={filter}
          placeholder="Category"
          options={categories} 
          onChange={(newValue) => {
            setFilter(newValue);
            router.push(pathname + "?" + createQueryString("filter", newValue));
          }} 
          icon="/icon/funnel-simple.svg"
          ></Select>
      </div>
    </div>
  );
};

export default Tools;
