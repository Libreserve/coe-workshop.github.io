"use client";

import SearchBar from "@/app/components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { TagNav } from "@/app/components/Navigation/TagNav/TagNav";
import styles from "./landing.module.scss";
import { TypeEffect } from "@/app/components/UI/TypeEffect/TypeEffect";
import { useRouter, useSearchParams } from "next/navigation";

function LandingClient() {
  const [typeOptions] = useState([
    "Print 3D",
    "ออกแบบชิ้นส่วน",
    "Microcontroller",
  ]);
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
  const [itemname,setItemname] = useState<string>("")
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(()=>{
    console.log(itemname)
  },[itemname])
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (itemname) {
      params.set("search", itemname);
    } else if (itemname === "") {
      params.delete("search");
    }

    // if (category) {
    //   params.set("filter", category);
    // }

    router.push(`/tools?${params.toString()}`);
  };

  return (
    <div className={styles.landing}>
      <div className={styles.landing_body}>
        <div className={styles.header}>
          <h2 className={styles.header_text}>ค้นหาอุปกรณ์สำหรับ</h2>
          <TypeEffect options={typeOptions}></TypeEffect>
        </div>
        <div className={styles.searchBar}>
          <SearchBar
          value={itemname}
          setValue={setItemname}
          onEnter={handleSearch}
            placeholder="ค้นหาอุปกรณ์ที่ต้องการจอง"
            borderFocus
          ></SearchBar>
        </div>
        <div>
          <div className={styles.action}>
            <h2 className={styles.action_title}>หมวดหมู่</h2>
            <div className={styles.category}>
              {categories.map((c, index) => (
                <div key={index} 
                // onClick={() => handleSearch(null, c)}
                >
                  <TagNav title={c}></TagNav>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <WelcomeText></WelcomeText>
      <Category></Category>
      <Guide></Guide>
      <Discover></Discover> */}
      {/* <Popular></Popular>
      <Interpreting></Interpreting> */}
      {/* <Accordion></Accordion> */}
    </div>
  );
}
export default LandingClient;
