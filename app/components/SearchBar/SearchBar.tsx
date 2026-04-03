import { SearchBarProps } from "./SearchBar.type"
import styles from "./SearchBar.module.scss"
import SvgIconMono from "../Icon/SvgIconMono"
const SearchBar=({
        placeholder="",
        borderFocus=false,
        onEnter,
        setValue,
        value
}:SearchBarProps)=>{
    const handleKeyDown =(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === "Enter" && onEnter){
            onEnter()
        }
    }
    return (
        <div  className={`${styles.searchBar} ${borderFocus? styles.canFocus:""}`}>
            <SvgIconMono src="search.svg"></SvgIconMono>
            <input className={`${styles.input}`} onChange={(e)=>setValue(e.target.value)} value={value} onKeyDown={handleKeyDown} placeholder={placeholder} type="text" />
        </div>
    )
}

export default SearchBar