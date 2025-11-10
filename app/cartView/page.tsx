// state to load data from db 
// state update quantity 
// state to remove item from cart 
// state to redirect to checkout page -> to ensure if user is logged in or not 

// question to ask backend team 
// -> is this cart data initially stored in session  or in db ?

// ignore tsx first 
'use client';
import {useEffect, useState} from "react";
import Image from "next/image";


function CartItemsAction({ item, onIncrease, onDecrease, onRemove }:CartItemsMatches){
    return (
        <div >
            <Image
                src={item.ImageUrl}
                    alt={item.Title}
                    width={100}
                    height={100}
                />
            <div>{item.Title}</div>
            <div>{item.Description}</div>
            <div>
                <div onClick={onDecrease}>
                    -
                </div>
                <div>
                {item.Quantity}
                </div>
                <button onClick={onIncrease}>
                    +
                </button>
            </div>
            <div onClick={onRemove}>remove item</div>
        </div>
    )
}

// for mock data
const mockCartData: UserCart = {
  items: [
    {
      Url: "https://store.com/products/1",
      ImageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      Title: "Wireless Headphones",
      Description: "Noise-cancelling over-ear headphones with 20h battery life.",
      Quantity: 1,
      Available: 35,
    },
    
  ],
  checkoutData: {
    paymentMethod: "Credit Card",
    shippingAddress: "99 Main Street, Bangkok, Thailand",
    deliveryOption: "Standard Delivery (3–5 days)",
  },
};
// localStorage.setItem("cart-data", JSON.stringify(mockCartData));

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
        if (updateCart.items[index].Quantity > 0) updateCart.items[index].Quantity --;
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
        <div >
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
    );
}
export default cartView;