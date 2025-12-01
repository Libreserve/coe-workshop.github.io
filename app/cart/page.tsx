import styles from "@/app/page.module.scss";
import CartView from "@/app/components/CartView/CartView";
function tools(){
    return (
        <div className={styles.landing} >
            <CartView></CartView>
        </div>
    );
}
export default tools;