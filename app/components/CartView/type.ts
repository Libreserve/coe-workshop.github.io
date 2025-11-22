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
  };
}


interface CartItemsMatches {
    item: item;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}
