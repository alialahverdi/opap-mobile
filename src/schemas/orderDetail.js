import ProductSchema from './product'

const OrderDetailSchema = {
    name: "OrderDetail",
    properties: {
        count: "int",
        ...ProductSchema.properties
    }
}

export default OrderDetailSchema