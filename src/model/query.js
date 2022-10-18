import realm from './v1/realmInstance';

const storeArray = async (arr, schema) => {
    try {
        realm.write(() => {
            arr.map(data => {
                realm.create(schema, data)
            })
        })
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

const deleteAllDataFromSchema = async (schema) => {
    try {
        realm.write(() => {
            realm.delete(realm.objects(schema))
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteAllSchema = async (schema) => {
    try {
        realm.write(() => {
            realm.deleteAll()
        })
    } catch (error) {
        console.log(error)
    }
}

export { storeArray, storeObj, updateArray, updateObj, deleteAllDataFromSchema, deleteAllSchema };