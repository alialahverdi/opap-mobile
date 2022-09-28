const ProductSchema = {
    name: "Product",
    properties: {
        ProductID: "int",
        ProductName: "string",
        SupplierID: "int",
        SupplierName: "string",
        StockQty: "int",
        SalesPrice: "int",
        BuyPrice: "int",
        CustomerPrice: "int",
        PayDay: "int",
        UnitQty: "int",
        PackQty: "int",
        ExprDate: "string",
        ExprDateMiladi: "string",
        PromotionDesc: "string",
        Taxable: "int",
        GroupID: "int",
        GroupName: "string",
        NewProd: "int"
    },
    primaryKey: "ProductID"
};

export default ProductSchema;