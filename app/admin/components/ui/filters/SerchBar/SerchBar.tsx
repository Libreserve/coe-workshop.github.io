"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./SerchBar.module.scss";
import { SerchBarProps } from "./types";

function SerchBar({ onSearch, placeholder = "Search by name ..." }: SerchBarProps) {
  const [searchItem, setSearchItem] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchItem(value);
    onSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchItem);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.searchContainer}>
        <Image
          src={"/Tools/serch.svg"}
          alt={"serch icon"}
          width={20}
          height={20}
          className={styles.img}
        />
        <input
          type={"text"}
          value={searchItem}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles.searchInput}
        />
      </div>
    </form>
  );
}

export default SerchBar;
