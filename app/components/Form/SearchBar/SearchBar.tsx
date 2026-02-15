"use client";

import { SearchBarProps } from "./SearchBar.type";
import styles from "./SearchBar.module.scss";
import { useEffect, useRef } from "react";
export const SearchBar = ({ placeholder = "", onSearch }: SearchBarProps) => {
  const inputRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (onSearch) onSearch(e.currentTarget.textContent || "");
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);
  return (
    <div className={styles.searchbar}>
      <div
        ref={inputRef}
        className={styles.input}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
      ></div>
      <p className={styles.placeholder}>{placeholder}</p>
    </div>
  );
};
