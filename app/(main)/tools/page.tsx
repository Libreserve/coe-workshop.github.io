"use client";

import { SearchBar } from "@/app/components/SearchBar/SearchBar";
import styles from "./SearchItem.module.scss";
import { useEffect } from "react";
import { Select } from "@/app/components/Select/Select";

const Tools = () => {
  useEffect(() => {
    console.log();
  }, []);

  const handleSelectChange = (value: string) => {
    console.log(value);
  };

  return (
    <div>
      <div className={styles.warpper}>
        <SearchBar placeholder="ชื่อของอุปกรณ์" iconSize={18}></SearchBar>
        <Select 
          placeholder="Category"
          options={["1","1","1","1",]} 
          onChange={handleSelectChange} 
          icon="/icon/funnel-simple.svg"
          ></Select>
      </div>
        <SearchBar placeholder="ชื่อของอุปกรณ์" iconSize={24}></SearchBar>
        <Select 
          placeholder="Category"
          options={["1","1","1","1",]} 
          onChange={handleSelectChange} 
          icon="/icon/funnel-simple.svg"
          iconSize={48}
        ></Select>
    </div>
  );
};

export default Tools;
