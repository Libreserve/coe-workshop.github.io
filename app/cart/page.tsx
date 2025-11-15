import styles from "@/app/page.module.scss";
import All_tools from "@/app/components/CartView/CartView";
import Navbar from "@/app/components/Navbar/Navbar";
function tools(){
    return (
        <div className={styles.landing} >
            <Navbar></Navbar>
            <All_tools></All_tools>
        </div>
    );
}
export default tools;