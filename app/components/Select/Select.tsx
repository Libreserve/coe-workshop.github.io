"use client";

import { useClickOutSide } from "@/app/hook/useClickOutSide";
import SvgIconMono from "../Icon/SvgIconMono";
import styles from "./Select.module.scss";
import { SelectProps } from "./Select.types";

export const Select = ({
  value,
  label,
  require = false,
  options,
  placeholder,
  errorMessage,
  onTop = false,
  onChange,
  icon,
  iconSize = 18, 
  iconWidth,
  iconHeight,
}: SelectProps) => {
  const finalWidth = iconWidth ?? iconSize;
  const finalHeight = iconHeight ?? iconSize;
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
        <h4 className={styles.input_value}>
          {icon && (
            <SvgIconMono
              className={styles.leftIcon} // เพิ่ม class สำหรับจัดระยะห่าง
              src={icon}
              alt="icon"
              width={finalWidth}
              height={finalHeight}
            />
          )}
          {!!value ? value : placeholder}
        </h4>

        <SvgIconMono
          className={`${styles.arrow} ${isOpen ? styles.arrow_open : ""}`}
          src={"/icon/arrow.svg"}
          alt="arrow"
          width={12}
          height={12}
        ></SvgIconMono>
        {isOpen && (
          <div
            ref={ref}
            className={`${styles.input_choiceContainer} ${onTop ? styles.input_onTop : ""}`}
            onClick={(e) => e.stopPropagation()} // ป้องกันการคลิกข้างในแล้วปิดทันที
          >
            {options.map((prefix, index) => (
              <button
                className={`${styles.input_choice} ${value === prefix ? styles.active : ""}`}
                type="button"
                onClick={() => {
                  onChange?.(prefix);
                  setIsopen(false); // optional เลือกแล้วควรปิดเมนู
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
