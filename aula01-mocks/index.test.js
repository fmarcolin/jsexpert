const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');


(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/invalid-header.csv'
        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                "name": "felipe",
                "id": 123,
                "profession": "backend",
                "birthDay": 1998
            },
            {
                "name": "joao",
                "id": 321,
                "profession": "frontend",
                "birthDay": 1994
            },
            {
                "name": "carlos",
                "id": 231,
                "profession": "devops",
                "birthDay": 1981
            }
        ]

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})();