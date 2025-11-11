'use client';
import {useEffect, useState} from "react";
import Image from "next/image";
import styles from "./CartView.module.scss";
import Link from "next/link";

function CartItemsAction({ item, onIncrease, onDecrease, onRemove }:CartItemsMatches){
    return (
        <div className={styles.item_card}>
            <Image
                src={item.ImageUrl}
                    alt={item.Title}
                    width={201}
                    height={177}
                />
            <div className={styles.item_card_details}>
                <Link href={item.Url} className={styles.item_card_details_title}>{item.Title}</Link>
                <div className={styles.item_card_details_description }>{item.Description}</div>
                
            </div>
            <div className={styles.item_card_buttons_group}>
                <div className={styles.item_card_buttons_group_left}>
                    <div onClick={onDecrease}>
                        -
                    </div>
                    <div>
                    {item.Quantity}
                    </div>
                    <div onClick={onIncrease}>
                        +
                    </div>
                </div>
                <div className={styles.item_card_buttons_group_right}>
                    <Image
                    onClick={onRemove}
                    src={"/bin-icon.svg"}
                    alt={"remove"}
                    width={28.91}
                    height={29.22}
                    />
                </div>
            </div>
        </div>
    )
}

// for mock data
const mockCartData: UserCart = {
  items: [
    {
      Url: "/",
      ImageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      Title: "Wireless Headphones",
      Description: "Noise-cancelling over-ear headphones with 20h battery life.",
      Quantity: 1,
      Available: 35,
    },

    {
      Url: "/",
      ImageUrl: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
      Title: "Wireless Headphones",
      Description: "Noise-cancelling over-ear headphones with 20h battery life.",
      Quantity: 1,
      Available: 35,
    },

    {
      Url: "/",
      ImageUrl: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
      Title: "Wireless Headphones",
      Description: "Noise-cancelling over-ear headphones with 20h battery life.",
      Quantity: 1,
      Available: 35,
    },
    {
      Url: "/",
      ImageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      Title: "Wireless Headphones",
      Description: "Noise-cancelling over-ear headphones with 20h battery life.",
      Quantity: 1,
      Available: 35,
    },
    {
      Url: "/",
      ImageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      Title: "Wireless Headphones",
      Description: "Noise-cancelling over-ear headphones with 20h battery life.",
      Quantity: 1,
      Available: 35,
    },

    {
      Url: "/",
      ImageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      Title: "Wireless Headphones",
      Description: "Noise-cancelling over-ear headphones with 20h battery life.",
      Quantity: 1,
      Available: 35,
    },

    {
      Url: "/",
      ImageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      Title: "Wireless Headphones",
      Description: "Noise-cancelling over-ear headphones with 20h battery life.",
      Quantity: 1,
      Available: 35,
    },
    {
      Url: "/",
      ImageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      Title: "Wireless Headphones",
      Description: "Noise-cancelling over-ear headphones with 20h battery life.",
      Quantity: 1,
      Available: 35,
    },
    
  ],
  checkoutData: {
  },
};
localStorage.setItem("cart-data", JSON.stringify(mockCartData));

function cartView(){
    const [userCart, setUserCart] = useState<UserCart>();

    const increaseQuantity = (index: number) => {
        const updateCart = { ...userCart!};
        if (updateCart.items[index].Quantity < updateCart.items[index].Available) updateCart.items[index].Quantity += 1;
        setUserCart(updateCart);
        localStorage.setItem("cart-data", JSON.stringify(updateCart));
    }
    const decreaseQuantity = (index: number) => {
        const updateCart = { ...userCart!};
        if (updateCart.items[index].Quantity > 1) updateCart.items[index].Quantity --;
        setUserCart(updateCart);
        localStorage.setItem("cart-data", JSON.stringify(updateCart));
    } 
    const removeItem = (index: number) => {
        const updateCart = { ...userCart!};
        updateCart.items.splice(index, 1);
        setUserCart(updateCart);
        localStorage.setItem("cart-data", JSON.stringify(updateCart));
    }

    useEffect(() => {
            setUserCart(localStorage.getItem("cart-data") ? JSON.parse(localStorage.getItem("cart-data")!) : []);
        }, [])
    return (
        <div className={styles.cart_view}>
            <div className={styles.cart_view_left}> 
                <h1 className={styles.cart_view_left_header}>TOOL BOX</h1>
                {
                    userCart?.items && userCart.items.length > 0 ? (
                        userCart.items.map((item, id) => (
                            <CartItemsAction 
                                key={id}
                                item={item}
                                onIncrease={() => {increaseQuantity(id)}}
                                onDecrease={() => {decreaseQuantity(id)}}
                                onRemove={() => {removeItem(id)}}
                            />
                        ))
                    ) : (
                        <div>No items in cart</div>
                    )
                }
            </div>
            <div className={styles.summary_cart}> 
                <div className={styles.summary_cart_table}>
                    <div className={styles.summary_cart_table_header }>
                        Product summary
                    </div>
                    <hr className={styles.summary__cart_table_header_boarder_line}></hr>
                    <div className={styles.summary_cart_table_body}>
                        {
                            userCart?.items && userCart.items.length > 0 ? (
                            userCart.items.map((item, id) => (
                                <div className={styles.summary_cart_table_item} key={id}>
                                    <div>
                                        {item.Title}
                                    </div>
                                    <div>
                                        *{item.Quantity}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No TOOL in cart</div>
                        )
                        }
                    </div>
                </div>

                <button className={styles.summary_cart_reserve_button}>
                        Reserve
                </button>
                
                <div className={styles.summary_cart_reserve_button_about}>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident
                </div>
            </div>
        </div>
    );
}
export default cartView;