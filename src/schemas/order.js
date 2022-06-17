const OrderSchema = {
    name: "Order",
    properties: {
        OrderID: "string",
        CustomerID: "int",
        CustomerName: "string",
        OrderDetail: "OrderDetail[]",
        Created_at: "string"
    },
    primaryKey: "OrderID"
}

export default OrderSchema