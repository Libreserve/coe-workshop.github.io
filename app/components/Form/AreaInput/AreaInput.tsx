import styles from "./AreaInput.module.scss";
import React from "react";
import { AreaInputProps } from "./AreaInput.types";
export const AreaInput = ({
  label,
  placeholder = "",
  require = false,
  value,
  errorMessage,
  onChange,
}: AreaInputProps) => {
  return (
    <div className={styles.AreaInput}>
      {label && (
        <label htmlFor={label} className={styles.areaInput_label}>
          {label}
          <span className={styles.areaInput_require}>
            {require ? " *" : ""}
          </span>
        </label>
      )}
      <textarea
        className={` ${errorMessage ? styles.error_input : ""} ${
          styles.areaInput_input
        }`}
        value={value}
        name={label}
        id={label}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange?.(e.target.value)
        }
        placeholder={placeholder}
      />
      {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
    </div>
  );
};
