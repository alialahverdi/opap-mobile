const createSchema = (obj) => {
    const schema = {};
    for (let key in obj) {
        schema[key] = obj[key]
    }
    return schema;
}

export { createSchema };