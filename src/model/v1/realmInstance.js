import Realm from "realm";

// Schemas
import CustomerSchema from '../../schemas/customer'
import ProductSchema from '../../schemas/product'
import OrderSchema from "../../schemas/order"
import OrderDetailSchema from "../../schemas/orderDetail"
import OpenFactorSchema from "../../schemas/openFactor"
import LocationSchema from "../../schemas/location"


// Create or Open database wtih schema
const realm = new Realm({
    schema: [
        CustomerSchema,
        ProductSchema,
        OrderSchema,
        OrderDetailSchema,
        OpenFactorSchema,
        LocationSchema
    ],
    schemaVersion: 2
});

// Export the realm instance
export default realm;

