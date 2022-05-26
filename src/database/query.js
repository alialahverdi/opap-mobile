import realm from './v1/realmInstance';

const store = async (arr, schema) => {
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