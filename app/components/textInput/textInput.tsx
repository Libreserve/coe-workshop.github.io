import { TextInputProps } from "./tpyes";
import styles from "./textinput.module.scss";

export const TextInput = ({
  title,
  placeholder = "",
  require = false,
}: TextInputProps) => {
  return (
    <div className={styles.textInput}>
      {title && (
        <label htmlFor={title} className={styles.textInput_label}>
          {title}
          <span className={styles.textInput_require}>{require ? "*" : ""}</span>
        </label>
      )}
      <input
        className={styles.textInput_input}
        type="text"
        name={title}
        id={title}
        placeholder={placeholder}
      />
    </div>
  );
};
