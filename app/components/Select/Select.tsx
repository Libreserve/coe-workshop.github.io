"use client";

import { useClickOutSide } from "@/app/hook/useClickOutSide";
import SvgIconMono from "../Icon/SvgIconMono";
import styles from "./Select.module.scss";
import { SelectProps } from "./Select.types";

export const Select = <T extends string = string,>({
  value,
  label,
  require = false,
  options,
  placeholder,
  errorMessage,
  onTop = false,
  onChange,
  icon, /* optional icon on the left */
  iconSize = 18,
  iconWidth,
  iconHeight,
}: SelectProps<T>) => {
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
        className={`${styles.input} ${isOpen ? styles.input_focus : ""} ${errorMessage ? styles.input_error : ""}`}
      >
        <h4 className={styles.input_value}>
          {icon && (
            <SvgIconMono
              className={styles.leftIcon}
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
            className={`${styles.input_choiceContainer} ${onTop ? styles.input_onTop : ""} ${isOpen ? styles.input_open : ""}`}
          >
            {options.map((prefix, index) => (
              <button
                className={styles.input_choice}
                type="button"
                onClick={() => {
                  onChange?.(prefix);
                  setIsopen(false);
                }}
                key={index}
              >
                {prefix}
              </button>
            ))}
          </div>
        )}
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
