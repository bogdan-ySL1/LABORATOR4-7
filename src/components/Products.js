import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import CardCustom from "../components/CardCustom";
const Product = () => {
    const [products, setProducts] = useState([]);
    const FetchProducts = () => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => setProducts(data.products));
    };
    useEffect(() => {
        FetchProducts();
    }, []);
    return (_jsx("div", { style: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            padding: '1rem',
            margin: '1rem',
        }, children: products.map((product, index) => {
            return (_jsx(CardCustom, { product: product }, index));
        }) }));
};
export default Product;
