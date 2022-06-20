const OrderSchema = {
    name: "Order",
    properties: {
        OrderID: "string",
        CustomerID: "int",
        CustomerName: "string",
        isSent: { type: "bool", default: false },
        Created_at: "string",
        OrderDetail: "OrderDetail[]"
    },
    primaryKey: "OrderID"
}

export default OrderSchema