interface item {
        Url: string;
        ImageUrl: string;
        Title: string;
        Description: string;
        Quantity: number;
        Available: number;
}

interface UserCart {
  items: item[];
  checkoutData: {
    paymentMethod: string;
    shippingAddress: string;
    deliveryOption: string;
  };
}


interface CartItemsMatches {
    item: item;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}
