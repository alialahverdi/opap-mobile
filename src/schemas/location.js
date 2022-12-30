const LocationSchema = {
    name: "Location",
    properties: {
        Latitude: "string",
        Longitude: "string",
        TrackDate: "string",
        TrackTime: "string",
        TrackTimeStamp: "int"
    },
    primaryKey: "TrackTimeStamp"
}

export default LocationSchema;