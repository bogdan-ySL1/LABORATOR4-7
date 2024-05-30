import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from 'antd';
const { Meta } = Card;
import { StarFilled } from '@ant-design/icons';
const CardCustom = (props) => {
    const { product } = props;
    return (_jsxs(Card, { hoverable: true, style: { width: 240 }, cover: _jsx("img", { alt: product.title, src: product.thumbnail }), children: [_jsx(Meta, { title: product.title, description: product.description }), _jsxs("h2", { children: ["Price: ", product.price, " $"] }), _jsxs("h2", { children: ["Discount: ", product.discountPercentage, " %"] }), _jsxs("h3", { children: ["Rating: ", product.rating, "    ", _jsx(StarFilled, {})] })] }));
};
export default CardCustom;
