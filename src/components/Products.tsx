import { useEffect, useState } from "react";
import CardCustom from "../components/CardCustom";

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

const Product = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("./src/products.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                padding: '1rem',
                margin: '1rem',
            }}
        >
            {products.map((product, index) => (
                <CardCustom key={index} product={product} />
            ))}
        </div>
    );
};

export default Product;
