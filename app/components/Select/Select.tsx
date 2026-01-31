"use client";

import styles from "./Select.module.scss";
import { SelectProps } from "./Select.types";
import IconSvgMono from "../Icon/SvgIcon";
import { useClickOutSide } from "@/app/hook/useClickOutSide";
import Image from "next/image";

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

        <IconSvgMono
          className={styles.icon}
          src={"/icon/arrow.svg"}
          alt="arrow"
          width={12}
          height={12}
        ></IconSvgMono>
        {isOpen && (
          <div
            ref={ref}
            className={`${styles.input_choiceContainer} ${onTop ? styles.input_onTop : ""}`}
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
