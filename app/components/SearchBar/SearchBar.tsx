"use client";

// funnel-simple
import { SearchBarProps } from "./SearchBar.type";
import styles from "./SearchBar.module.scss";
import SvgIconMono from "../Icon/SvgIconMono";
import { useEffect, useRef, useState } from "react";
import { useTextOverflow } from "@/app/hook/useTextOverflow";

export const SearchBar = ({ 
    searching = "",
    placeholder = "", 
    iconSize=24,
    onEnter,
}: SearchBarProps) => {

    const [isEnter, setIsEnter] = useState(!!searching);
    const inputRef = useRef<HTMLInputElement>(null);

    const { showLeftFade, showRightFade, updateFadeStates } = useTextOverflow(inputRef);

    useEffect(() => {
        if (inputRef.current) {
            // ยัดค่า searching ใส่ input
            inputRef.current.value = searching;
            // อัปเดตสถานะ Active ของไอคอน
            setIsEnter(!!searching);
            updateFadeStates();
        }
    }, [searching, updateFadeStates]);
    
    return (
    <div className={styles.searchbar}>
        <SvgIconMono
            className={`${styles.search} ${isEnter ? styles.active : ""}`}
            src={"/search.svg"}
            alt="search"
            width={iconSize}
            height={iconSize}
        ></SvgIconMono>
        <div className={`${styles.input} 
                         ${showLeftFade ? styles.fadeLeft : ""} 
                         ${showRightFade ? styles.fadeRight : ""}`}>
            <input
                ref={inputRef}
                type="text"
                className={`${styles.inside} ${isEnter ? styles.active : ""}`}
                defaultValue={searching}
                placeholder={placeholder}
                onScroll={updateFadeStates}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        const el = e.target as HTMLInputElement;
                        setIsEnter(el.value.trim() !== "");    
                        onEnter?.(el.value.trim());
                        inputRef.current?.blur(); // ออกจาก focus
                    }
                }}
                onInput={(e) => {
                    const el = e.target as HTMLInputElement;
                    if (el.value.trim() === "") {
                        setIsEnter(false); // กลับไปสถานะเดิม
                    }
                    updateFadeStates();
                }}
            />
            <div className={styles.underline} />
        </div>
    </div>
  );
};
