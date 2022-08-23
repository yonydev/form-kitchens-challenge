export type TProduct = {
  products: {
    code: string;
    position: number;
    quantity: number;
    image: string;
    price: number;
    description: string;
  };
};

export type TCol = {
  Header: string;
  accessor: keyof TProduct['products'];
};
