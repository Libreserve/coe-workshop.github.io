"use client";

import { useClickOutSide } from "@/app/hook/useClickOutSide";
import SvgIconMono from "../Icon/SvgIconMono";
import styles from "./Select.module.scss";
import { SelectOption, SelectProps } from "./Select.types";

export const Select = <T extends string = string,>({
  value,
  defaultValue,
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
  size = "md",
  variant = "default"
}: SelectProps<T>) => {
  const finalWidth = iconWidth ?? iconSize;
  const finalHeight = iconHeight ?? iconSize;
  const { ref, isOpen, setIsopen } = useClickOutSide();

  const displayValue = value ?? defaultValue;

  const normalizedOptions: SelectOption<T>[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt as T } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === displayValue);
  const displayLabel = selectedOption?.label ?? (displayValue || placeholder);

  return (
    <div className={styles.select}>
      {label && (
        <h2>
          {label} {require && <span className={styles.require}> *</span>}
        </h2>
      )}
      <div
        onClick={() => setIsopen((prev) => !prev)}
        className={`${styles.input} ${styles[size]} ${styles[variant]} ${isOpen ? styles.input_focus : ""} ${errorMessage ? styles.input_error : ""}`}
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
          {displayLabel}
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
            {normalizedOptions.map((option, index) => (
              <button
                className={styles.input_choice}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.(option.value);
                  setIsopen(false);
                }}
                key={index}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
