"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./CartView.module.scss";
import Link from "next/link";
import type {
  CartItemsProps,
  UserCartProps,
  TransactionProps,
} from "./CartView.type";
import { TransactionStatus } from "./CartView.type";

const CartItemsAction = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemsProps) => {
  return (
    <div className={styles.item_card}>
      <Image
        src={item.imageUrl}
        alt={item.title}
        width={100}
        height={100}
        className={styles.item_card_img}
      />
      <div className={styles.item_card_details}>
        <Link href={item.url} className={styles.item_card_details_title}>
          {item.title}
        </Link>
        <div className={styles.item_card_details_description}>
          {item.description}
        </div>
      </div>
      <div className={styles.item_card_buttons_group}>
        <div className={styles.item_card_buttons_group_left}>
          <div onClick={onDecrease}>-</div>
          <p>{item.quantity}</p>
          <div onClick={onIncrease}>+</div>
        </div>
        <Image
          onClick={onRemove}
          src={"/bin-icon.svg"}
          alt={"remove"}
          width={28.91}
          height={29.22}
          className={styles.item_card_buttons_group_remove}
        />
      </div>
    </div>
  );
};
const getDbDateTime = (date: Date): string => {
  return date.toLocaleString("en-CA", { hour12: false }).replace(",", "");
};
const CartView = () => {
  const [userCart, setUserCart] = useState<UserCartProps | undefined>();
  const [onLoad, setOnLoad] = useState(false);
  // ใน nextมีcomponentอะไรนะ
  const [loadingMessage, setLoadingMessage] = useState("กำลังโหลด...");

  const increaseQuantity = (index: number) => {
    if (!userCart) return;
    const updateCart = { ...userCart };
    if (updateCart.items[index].quantity < updateCart.items[index].available)
      updateCart.items[index].quantity += 1;
    setUserCart(updateCart);
    localStorage.setItem("cart-data", JSON.stringify(updateCart));
  };
  const decreaseQuantity = (index: number) => {
    if (!userCart) return;
    const updateCart = { ...userCart };
    if (updateCart.items[index].quantity > 1)
      updateCart.items[index].quantity--;
    setUserCart(updateCart);
    localStorage.setItem("cart-data", JSON.stringify(updateCart));
  };
  const removeItem = (index: number) => {
    if (!userCart) return;
    const updateCart = { ...userCart };
    updateCart.items.splice(index, 1);
    setUserCart(updateCart);
    localStorage.setItem("cart-data", JSON.stringify(updateCart));
  };
  // todo ประกอบdata ส่งไป transaction รอรับ response , ดูว่าเราจะเอาgmail user มาไง
  const getReserveData = () => {
    const today = new Date();
    const reservationData: TransactionProps = {
      email: "scoopy",
      status: TransactionStatus.PENDING,
      startDay: getDbDateTime(today),
      toolList:
        userCart?.items?.map((tool) => ({
          name: tool.title || "",
          image: tool.imageUrl || "",
          quantity: tool.quantity || 0,
        })) || [],
    };
    return reservationData;
  };

  const reserve = async () => {
    const reservationData = getReserveData();
    if (reservationData.toolList.length === 0) return;
    setOnLoad(true);
    setLoadingMessage("reserving");
    try {
      console.log("ยิงapiปิ๋วๆ");
      // throw new Error("wait");
      // todo if transaction was success then pop cart-data
      // setUserCart({});
      const cartData = { checkoutData: {}, items: [] };
      localStorage.setItem("cart-data", JSON.stringify(cartData));
    } catch (error) {
      console.log(error);
      console.error("ไม่ให้จอง");
    }
    setOnLoad(false);
    setLoadingMessage("Loding");
  };

  const fetchData = async () => {
    setOnLoad(true);
    try {
      const cartData = localStorage.getItem("cart-data") || undefined;
      if (cartData) setUserCart(JSON.parse(cartData));
    } catch (error) {
      console.error("error while fetching cart data ");
      console.log(error);
    }
    setOnLoad(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {onLoad && <div className={styles.onLoad}>{loadingMessage}</div>}
      <div className={styles.cart_view}>
        <div className={styles.cart_view_left}>
          <h1 className={styles.cart_view_left_header}>TOOL BOX</h1>
          {userCart && userCart.items.length > 0 ? (
            userCart.items.map((item, id) => (
              <CartItemsAction
                key={id}
                item={item}
                onIncrease={() => {
                  increaseQuantity(id);
                }}
                onDecrease={() => {
                  decreaseQuantity(id);
                }}
                onRemove={() => {
                  removeItem(id);
                }}
              ></CartItemsAction>
            ))
          ) : (
            <div className={styles.fackball}>no item in cart...🧐</div>
          )}
        </div>
        <div className={styles.summary_cart}>
          <div className={styles.summary_cart_table}>
            <div className={styles.summary_cart_table_header}>
              Product summary
            </div>
            <hr className={styles.summary__cart_table_header_boarder_line}></hr>
            <div className={styles.summary_cart_table_body}>
              {userCart?.items && userCart.items.length > 0 ? (
                userCart.items.map((item, id) => (
                  <div className={styles.summary_cart_table_item} key={id}>
                    <div>{item.title}</div>
                    <div>*{item.quantity}</div>
                  </div>
                ))
              ) : (
                <div className={styles.fackball}>
                  what are you waiting🤔 go grab some tool. It's &#8721;ng
                  student's soulmate👊{" "}
                </div>
              )}
            </div>
          </div>

          <button
            className={styles.summary_cart_reserve_button}
            onClick={() => reserve()}
          >
            Reserve
          </button>

          <div className={styles.summary_cart_reserve_button_about}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident
          </div>
        </div>
      </div>
    </>
  );
};
export default CartView;
