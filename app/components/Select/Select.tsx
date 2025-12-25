import { SelectProps } from "./Select.types";
import styles from "./Select.module.scss";
import Image from "next/image";

export const Select = ({
  label,
  require = false,
  options,
  placeholder,
  errorMessage,
}: SelectProps) => {
  return (
    <div className={styles.select}>
      <label htmlFor="select">
        {label} {require && <span className={styles.require}> *</span>}
      </label>
      <div className={styles.input}>
        <select name={label} id="select" className={styles.input_select}>
          {placeholder && (
            <option value={placeholder} selected={true} disabled>
              {placeholder}
            </option>
          )}
          {options.map((prefix, index) => (
            <option key={index} value={prefix}>
              {prefix}
            </option>
          ))}
        </select>
        <Image
          className={styles.icon}
          src={"/icon/arrow.svg"}
          alt="arrow"
          width={12}
          height={12}
        ></Image>
      </div>
    </div>
  );
};
