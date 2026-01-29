"use client";

import { SelectProps } from "./Select.types";
import styles from "./Select.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useClickOutSide } from "@/app/hook/useClickOutSide";

export const Select = ({
  value,
  label,
  require = false,
  options,
  placeholder,
  errorMessage,
  onTop = false,
  disable = false,
  onChange,
}: SelectProps) => {
  const { ref, isOpen, setIsopen } = useClickOutSide();

  return (
    <div className={styles.select}>
      <h2>
        {label} {require && <span className={styles.require}> *</span>}
      </h2>
      <div
        onClick={() => setIsopen((prev) => !prev)}
        className={`${styles.input} ${isOpen ? styles.input_focus : ""}`}
      >
        <h4 className={styles.input_value}>{!!value ? value : placeholder}</h4>

        <Image
          className={styles.icon}
          src={"/icon/arrow.svg"}
          alt="arrow"
          width={12}
          height={12}
        ></Image>
        {isOpen && (
          <div
            ref={ref}
            className={`${styles.input_choiceContainer} ${styles.input_onTop}`}
          >
            {options.map((prefix, index) => (
              <button
                className={styles.input_choice}
                type="button"
                onClick={() => {
                  onChange?.(prefix);
                }}
                key={index}
              >
                {prefix}
              </button>
            ))}
          </div>
        )}
      </div>
      {value === "" && errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
};
