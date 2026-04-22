import { TextInputProps } from "./tpyes";
import styles from "./TextInput.module.scss";
import React from "react";

export const TextInput = ({
  label,
  placeholder = "",
  require = false,
  value,
  errorMessage,
  onChange,
}: TextInputProps) => {
  return (
    <div className={styles.textInput}>
      {label && (
        <label htmlFor={label} className={styles.textInput_label}>
          {label}
          <span className={styles.textInput_require}>
            {require ? " *" : ""}
          </span>
        </label>
      )}
      <input
        className={` ${errorMessage ? styles.error_input : ""} ${
          styles.textInput_input
        }`}
        type="text"
        value={value}
        name={label}
        id={label}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange?.(e.target.value)
        }
        placeholder={placeholder}
      />
      {errorMessage && <h4 className={styles.error}>{errorMessage}</h4>}
    </div>
  );
};

