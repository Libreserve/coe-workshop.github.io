import styles from "@/app/page.module.scss";
import CartView from "@/app/components/CartView/CartView";
const Cart = () => {
  return (
    <div className={styles.landing}>
      <CartView></CartView>
    </div>
  );
};
export default Cart;
