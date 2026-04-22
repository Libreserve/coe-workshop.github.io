import { SearchBarProps } from "./SearchBar.type"
import styles from "./SearchBar.module.scss"
import SvgIconMono from "../Icon/SvgIconMono"

const SearchBar = ({
        placeholder = "",
        borderFocus = false,
        onEnter,
        setValue,
        value,
        size = "md",
}: SearchBarProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onEnter) {
            onEnter()
        }
    }
    return (
        <div className={`${styles.searchBar} ${styles[size]} ${borderFocus ? styles.canFocus : ""}`}>
            <SvgIconMono src="/search.svg" />
            <input
                className={`${styles.input}`}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                type="text"
            />
        </div>
    )
}

export default SearchBar
