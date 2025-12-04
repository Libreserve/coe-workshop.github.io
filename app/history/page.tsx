import AllHistory from "../components/AllHistory/AllHistory";
import styles from "@/app/page.module.scss";

const history = () => {
    return (
        <div className={styles.landing}>
            <AllHistory></AllHistory>
        </div>    
    );
}

export default history;