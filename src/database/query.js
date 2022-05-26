import realm from './v1/realmInstance';
import { createSchema } from '../utils/database';

const store = (arr, schema) => {
    try {
        arr.map(item => {
            realm.write(() => {
                realm.create(schema, item);
            });
        });
    } catch (error) {
        console.log(error)
    }
};

export { store };