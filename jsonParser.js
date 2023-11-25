function customSplit(jsonString) {
    let results = [];
    let start = 0;
    let depth = 0;

    for (let i = 0; i < jsonString.length; i++) {
        let char = jsonString[i];

        if (char === '{') {
            depth++;
        } else if (char === '}') {
            depth--;
        } else if (char === ',' && depth === 0) {
            results.push(jsonString.substring(start, i));
            start = i + 1;
        }
    }

    results.push(jsonString.substring(start)); // Add the last segment
    console.log("customSplit results:", results); // Debugging
    return results;
}

function parseJSON(jsonString) {
    if (jsonString.startsWith('{') && jsonString.endsWith('}')) {
        let keyValuePairs = customSplit(jsonString.slice(1, -1));

        let result = {};

        keyValuePairs.forEach(pair => {
            let colonIndex = pair.indexOf(':');
            let key = pair.substring(0, colonIndex).trim().slice(1, -1);
            let value = pair.substring(colonIndex + 1).trim();

            if (value.startsWith('{') && value.endsWith('}')) {
                value = parseJSON(value); // Recursively parse the nested object
            } else {
                value = value.startsWith('"') && value.endsWith('"') ? value.slice(1, -1) : (!isNaN(value) ? Number(value) : value);
            }

            result[key] = value;
        });

        return result;
    } else {
        // Handle simple strings or numbers (not covered in current implementation)
    }
}

module.exports = { parseJSON };