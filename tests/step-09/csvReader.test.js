const readCSV = require('../../src/csvReader');
const { parseQuery } = require('../../src/queryParser');
const executeSELECTQuery = require('../../src/index');
const path= require('path');
test('Read CSV File', async () => {
    const csvPath = path.join(__dirname, '../../student.csv');
    const data = await readCSV(csvPath);
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBe(4);
    expect(data[0].name).toBe('John');
    expect(data[0].age).toBe('30'); //ignore the string type here, we will fix this later
});

