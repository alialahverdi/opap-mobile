import realm from './v1/realmInstance';

const storeArray = async (arr, schema) => {
    try {
        const result = arr.map(data => {
            realm.write(() => {
                realm.create(schema, data);
            })
        })
        return result
    } catch (error) {
        console.log(error)
    }
};

const storeObj = async (data, schema) => {
    try {
        let result
        realm.write(() => {
            result = realm.create(schema, data);
        });
        return result
    } catch (error) {
        console.log(error)
    }
};

const updateArray = async (arr, data) => {
    try {
        realm.write(() => {
            arr.push(data)
        })
    } catch (error) {
        console.log(error)
    }
}

const updateObj = async (data) => {
    try {
        realm.write(() => {
            arr.push(data)
        })
    } catch (error) {
        console.log(error)
    }
}

export { storeArray, storeObj, updateArray, updateObj };