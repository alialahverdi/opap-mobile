import Realm from "realm";

// Schemas
import CustomerSchema from '../../schemas/customer';
import ProductSchema from '../../schemas/product';


// Create or Open database wtih schema
const realm = new Realm({
    schema: [CustomerSchema, ProductSchema],
    schemaVersion: 1
});

// Export the realm instance
export default realm;

