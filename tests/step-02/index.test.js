const readCSV = require('../../src/csvReader');
const path = require('path');
test('Read CSV File', async () => {
    const csvPath = path.join(__dirname, '../../sample.csv');
    const data = await readCSV(csvPath);
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBe(3);
    expect(data[0].name).toBe('John');
    expect(data[0].age).toBe('30');
});