"use client";

// funnel-simple
import { SearchBarProps } from "./SearchBar.type";
import styles from "./SearchBar.module.scss";
import SvgIconMono from "../Icon/SvgIconMono";
import { useEffect, useRef, useState } from "react";

export const SearchBar = ({ 
    placeholder = "", 
    iconSize=24,
}: SearchBarProps) => {

    const [isEnter, setIsEnter] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    return (
    <div className={styles.searchbar}>
        <SvgIconMono
            className={`${styles.search} ${isEnter ? styles.active : ""}`}
            src={"/search.svg"}
            alt="search"
            width={iconSize}
            height={iconSize}
        ></SvgIconMono>
        <div className={`${styles.input} ${isEnter ? styles.active : ""}`}>
            <input
                ref={inputRef}
                type="text"
                className={`${styles.inside} ${isEnter ? styles.active : ""}`}
                placeholder={placeholder}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                    e.preventDefault();
                    const el = e.target as HTMLInputElement;
                    el.value.trim() === "" ? setIsEnter(false) : setIsEnter(true);    
                    inputRef.current?.blur(); // ออกจาก focus
                    }
                }}
                onInput={(e) => {
                    const el = e.target as HTMLInputElement;
                    if (el.value.trim() === "") {
                    setIsEnter(false); // กลับไปสถานะเดิม
                    }
                }}
            />
        </div>
    </div>
  );
};
