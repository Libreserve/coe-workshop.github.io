import { SearchBarProps } from "./SearchBar.type";
import styles from "./SearchBar.module.scss";
export const SearchBar = ({ placeholder = "" }: SearchBarProps) => {
  return (
    <div className={styles.searchbar}>
      <div
        className={styles.input}
        contentEditable
        suppressContentEditableWarning
      ></div>
      <p className={styles.placeholder}>{placeholder}</p>
    </div>
  );
};
