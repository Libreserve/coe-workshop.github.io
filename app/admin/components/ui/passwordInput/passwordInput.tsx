"use client";

import { PasswordInputProps } from "./tpyes";
import styles from "./passwordInput.module.scss";
import React, { useState } from "react";
import { EyeIcon } from "@/public/react-icon/eyeIcon";
export const PasswordInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  require = true,
}: PasswordInputProps) => {
  const [hide, setHide] = useState(true);
 
  return (
    <div className={styles.textInput}>
      {label && (
        <label htmlFor={label} className={styles.textInput_label}>
          {label}
          <span className={styles.textInput_require}>{require ? "*" : ""}</span>
        </label>
      )}
 
      <div className={styles.inputWrapper}>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.(e.target.value)
          }
          value={value}
          className={styles.textInput_input}
          type={hide ? "password" : "text"}
          name={label}
          id={label}
          placeholder={placeholder}
        />
 
        <button
          type="button"
          className={styles.password_toggle}
          onClick={() => setHide(!hide)}
          aria-label={hide ? "แสดงรหัสผ่าน" : "ซ่อนรหัสผ่าน"}
        >
          <EyeIcon isHide={hide}></EyeIcon>
        </button>
      </div>
    </div>
  );
};
