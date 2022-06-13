import realm from './v1/realmInstance';

const storeArray = async (arr, schema) => {
    try {
        const result = arr.map(item => {
            realm.write(() => {
                realm.create(schema, item);
            });
        })
        return result
    } catch (error) {
        console.log(error)
    }
};

const storeObj = async (obj, schema) => {
    try {
        let result;
        realm.write(() => {
            result = realm.create(schema, obj);
        });
        return result
    } catch (error) {
        console.log(error)
    }
};

export { storeArray, storeObj };