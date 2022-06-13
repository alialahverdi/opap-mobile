import ProductSchema from './product'

const OrderDetailSchema = {
    name: "OrderDetail",
    properties: {
        OrderID: "string",
        ...ProductSchema.properties,
        Created_at: "string"
    },
    primaryKey: "OrderID"
}

export default OrderDetailSchema