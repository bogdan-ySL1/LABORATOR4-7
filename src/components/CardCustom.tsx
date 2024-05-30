import { Card } from 'antd';
import { IProduct } from '../layouts/ContentCustom';
import { DollarOutlined } from '@ant-design/icons';
const { Meta } = Card;

interface IProductProps{
    product:  IProduct
}

const CardCustom = (props: IProductProps) => {
    const {product}= props;
    return(
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt={product.title} src={product.thumbnail} />}
        >

            <Meta title = {product.title} description={product.description} />
            <br />
            <h1><DollarOutlined />  {product.price}</h1>
            <h3>Stock: {product.stock} items</h3>

        </Card>
    );
}
export default CardCustom;