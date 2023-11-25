function parseJSON(jsonString) {
    let keyValueArray = jsonString.slice(1,-1).split(':')

    let key = keyValueArray[0].trim().slice(1,-1);
    let value =keyValueArray[1].trim().slice(1,-1);

    let result = {};
    result[key] =value;

    return result;
}





module.exports = { parseJSON };