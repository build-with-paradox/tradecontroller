export type OrderInterface = {
    id: number;
    order_id: string;
    username: string;
    email: string;
    payment: string;
    payment_type: string;
    product_count: number;
    total_amount: number;
    storeName: string;
    totalRevenue: number;
    orderDetails: {
      id: number;
      product: string;
      image: string;
      description: string;
      color: string;
      qty: number;
      price: number;
      total: number;
    }[];
  };

  export type CancelOrderInterface = {
    id: number;
    order_id: string;
    username: string;
    email: string;
    payment: string;
    payment_type: string;
    product_count: number;
    total_amount: number;
    storeName: string;
    cancelOrderDetails: {
      id: number;
      product: string;
      image: string;
      description: string;
      color: string;
      qty: number;
      price: number;
      total: number;
    }[];
  };



  export type PaymentTransactionInterface = {
    id: number;
    order_id: string;
    username: string;
    email: string;
    payment: string;
    payment_type: string;
    product_count: number;
    total_amount: number;
    storeName: string;
    seller_share: number;
    admin_share:number;
    cancelOrderDetails: {
      id: number;
      product: string;
      image: string;
      description: string;
      color: string;
      qty: number;
      price: number;
      total: number;
    }[];
  };

