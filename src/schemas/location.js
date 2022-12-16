const LocationSchema = {
    name: "Location",
    properties: {
        ID: "int",
        Lat: "string",
        Long: "string",
        Date: "string",
        TimeStamp: "int"
    },
    primaryKey: "ID"
}

export default LocationSchema;