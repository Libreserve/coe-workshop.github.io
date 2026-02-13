"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Tools = () => {
  const searchParams = useSearchParams();
  
  const search = searchParams.get("search");
  const filter = searchParams.get("filter");
  
  useEffect(() => {
    console.log();
  }, []);

  return (
    <div>
      <h1>ผลการค้นหาสำหรับ: {search || "ทั้งหมด"}</h1>
      <p>หมวดหมู่: {filter || "ทุกหมวดหมู่"}</p>
    </div>
  );
};

export default Tools;
