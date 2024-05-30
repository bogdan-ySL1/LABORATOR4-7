interface Product {
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}
export interface IProduct extends Product {
    id: number;
    title: string;
}
declare const Product: () => import("react/jsx-runtime").JSX.Element;
export default Product;
