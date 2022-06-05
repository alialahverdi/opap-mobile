const CustomerSchema = {
    name: "Customer",
    properties: {
        CustomerID: "int",
        CustomerName: "string",
        OwnerName: "string",
        StatusID: "int",
        GroupID: "int",
        GroupName: "string",
        SubGroupID: "int",
        SubGroupName: "string",
        Latitute: "string",
        Longitute: "string",
        Tell: "string",
        Mobile: "string",
        Address: "string",
        RemAmount: "int",
        RCheqCount: "int",
        RCheqAmount: "int",
        HCheqCount: "int",
        HCheqAmount: "int",
        CountOpen: "int",
        StatusName: "string"
    },
    primaryKey: "CustomerID",
};

export default CustomerSchema;