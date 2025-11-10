interface UserCart {
  items: {
    Url: string;
    ImageUrl: string;
    Title: string;
    Description: string;
    Quantity: number;
    Available: number;
  }[];
  checkoutData: {
    paymentMethod: string;
    shippingAddress: string;
    deliveryOption: string;
  };
}

interface CartItemsMatches {
    item: {
        Url: string;
        ImageUrl: string;
        Title: string;
        Description: string;
        Quantity: number;
        Available: number;
    };
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}