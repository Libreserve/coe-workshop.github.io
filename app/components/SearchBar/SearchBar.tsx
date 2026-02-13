"use client";

// funnel-simple
import { SearchBarProps } from "./SearchBar.type";
import styles from "./SearchBar.module.scss";
import SvgIconMono from "../Icon/SvgIconMono";
import { useRef, useState } from "react";
import { useTextOverflow } from "@/app/hook/useTextOverflow";

export const SearchBar = ({ 
    placeholder = "", 
    iconSize=24,
}: SearchBarProps) => {

    const [isEnter, setIsEnter] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const { showLeftFade, showRightFade, updateFadeStates } = useTextOverflow(inputRef);
    
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
                placeholder={placeholder}
                onScroll={updateFadeStates}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        const el = e.target as HTMLInputElement;
                        setIsEnter(el.value.trim() !== "");    
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
            <div className={styles.underline} />
        </div>
    </div>
  );
};
