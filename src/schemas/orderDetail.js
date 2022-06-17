import ProductSchema from './product'

const OrderDetailSchema = {
    name: "OrderDetail",
    properties: {
        OrderID: "string",
        ...ProductSchema.properties
    },
    primaryKey: "OrderID"
}

export default OrderDetailSchema