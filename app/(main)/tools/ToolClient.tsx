"use client";

import SearchBar from "@/app/components/SearchBar/SearchBar";
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
  const mockData = [
  { id: 1, name: "Multimeter Digital", category: "ELECTRONIC ⚡", avaliable: 12, total: 20 },
  { id: 2, name: "Wrench Set (8-24mm)", category: "MECHANICAL 🔧", avaliable: 5, total: 10 },
  { id: 3, name: "Soldering Station 60W", category: "SOLDERING 🔥", avaliable: 0, total: 15 },
  { id: 4, name: "Vernier Caliper 6\"", category: "MEASUREMENT 📏", avaliable: 8, total: 8 },
  { id: 5, name: "Pneumatic Cylinder A1", category: "PNEUMATIC 💨", avaliable: 20, total: 25 },
  { id: 6, name: "Power Drill 18V", category: "POWER TOOLS ⚙️", avaliable: 3, total: 5 },
  { id: 7, name: "Oscilloscope 100MHz", category: "ELECTRONIC ⚡", avaliable: 2, total: 4 },
  { id: 8, name: "Safety Helmet (Yellow)", category: "SAFETY 🦺", avaliable: 45, total: 50 },
  { id: 9, name: "PLC Mitsubishi FX5U", category: "AUTOMATION 🏭", avaliable: 4, total: 6 },
  { id: 10, name: "3D Printer Filament PLA", category: "3D PRINTING 🖨️", avaliable: 15, total: 30 },
  { id: 11, name: "Hydraulic Jack 2 Ton", category: "HYDRAULIC 🛢️", avaliable: 1, total: 2 },
  { id: 12, name: "Arduino Uno R3", category: "ROBOTICS 🤖", avaliable: 25, total: 40 },
  { id: 13, name: "Breadboard Large", category: "PROTOTYPING 🧪", avaliable: 50, total: 50 },
  { id: 14, name: "CNC Milling Bit Set", category: "CNC 🧱", avaliable: 7, total: 12 },
  { id: 15, name: "Electrical Wire 1.5mm", category: "ELECTRICAL 🔌", avaliable: 10, total: 10 },
  { id: 16, name: "Screwdriver Phillips #2", category: "HAND TOOLS 🛠️", avaliable: 18, total: 30 },
  { id: 17, name: "WD-40 Lubricant Spray", category: "MAINTENANCE 🔩", avaliable: 9, total: 12 },
  { id: 18, name: "Heat Shrink Tube Kit", category: "ELECTRONIC ⚡", avaliable: 100, total: 100 },
  { id: 19, name: "Air Compressor 2HP", category: "PNEUMATIC 💨", avaliable: 1, total: 1 },
  { id: 20, name: "NEMA 17 Stepper Motor", category: "ROBOTICS 🤖", avaliable: 8, total: 16 }
];
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
            placeholder="หมวดหมู่"
            options={categories}
            onChange={(value) => handleFilter(value as string)}
            icon="/icon/funnel-simple.svg"
          ></Select>
        </div>
      </div>
      <section className={styles.item_container}>
        {mockData.map((t,index)=>(
          <div key={index} className={styles.item}>
              <div className={styles.item_image_wrapper}></div>
            <div className={styles.item_info }>
              <p className={styles.item_category}>{t.category}</p>
              <h3 className={styles.item_name}>{t.name}</h3>
              <div className={styles.item_footer}>
                <div className={styles.item_stock}>
                  <p>จำนวนที่มี</p>
                  <h3 className={styles.item_quatity}>{t.avaliable}/{t.total} สามารถใช้ได้</h3>
              </div>
              <div className={styles.item_more_wrapper}>
              <div className={styles.item_more}>
                <h3>เพิ่มเติม</h3>
                <SvgIconMono className={styles.arrow_up_right} src="./icon/arrow-up-right.svg">
                </SvgIconMono>
                </div>
          </div>
              </div>
              
          </div>

        </div>
        ))}
        
      </section>
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
