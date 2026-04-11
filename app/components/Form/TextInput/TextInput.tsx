import { TextInputProps } from "./tpyes";
import styles from "./TextInput.module.scss";
import React from "react";

export const TextInput = ({
  title,
  placeholder = "",
  require = false,
  value,
  errorMessage,
  backgroundColor = "transparent",
  onChange,
}: TextInputProps) => {
  return (
    <div className={styles.textInput}>
      {title && (
        <label htmlFor={title} className={styles.textInput_label}>
          {title}
          <span className={styles.textInput_require}>
            {require ? " *" : ""}
          </span>
        </label>
      )}
      <input
        style={{ backgroundColor: backgroundColor }}
        className={` ${errorMessage ? styles.error_input : ""} ${
          styles.textInput_input
        }`}
        type="text"
        value={value}
        name={title}
        id={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange?.(e.target.value)
        }
        placeholder={placeholder}
      />
      {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
    </div>
  );
};
