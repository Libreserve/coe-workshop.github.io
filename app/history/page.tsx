import AllHistory from "../components/AllHistory/AllHistory";
import styles from "@/app/page.module.scss";

function history() {
    return (
        <div className={styles.landing}>
            <AllHistory></AllHistory>
        </div>    
    );
}

export default history;