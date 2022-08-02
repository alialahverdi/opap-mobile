const openFactorSchema = {
    name: "OpenFactor",
    properties: {
        CustomerID: "int",
        SalesID: "int",
        SalesNo: "string",
        SalesDate: "string",
        RemAmount: "int",
        PayDay: "int",
        NetAmount: "int",
        MDay: "int",
        PayDate: "string"
    },
    primaryKey: "SalesID"
};

export default openFactorSchema;