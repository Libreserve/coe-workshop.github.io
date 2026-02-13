import { SearchBarProps } from "./SearchBar.type";
import styles from "./SearchBar.module.scss";
export const SearchBar = ({ placeholder = "", onSearch }: SearchBarProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      // ส่งค่าที่พิมพ์ใน Input ออกไปเมื่อกด Enter
      onSearch(e.currentTarget.textContent || "");
    }
  };
  return (
    <div className={styles.searchbar}>
      <div
        className={styles.input}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
      ></div>
      <p className={styles.placeholder}>{placeholder}</p>
    </div>
  );
};
