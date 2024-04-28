// const executeSELECTQuery = require('../../src/index');

// test('Execute SQL Query with WHERE Clause', async () => {
//     const query = 'SELECT id, name FROM sample WHERE age = 25';
//     const result = await executeSELECTQuery(query);
//     expect(result.length).toBe(1);
//     expect(result[0]).toHaveProperty('id');
//     expect(result[0]).toHaveProperty('name');
//     expect(result[0].id).toBe('2');
// });

const executeSELECTQuery = require('../../src/index');

// Test for case-insensitive WHERE clause
test('Execute SQL Query with case-insensitive WHERE clause', async () => {
    const query = 'SELECT id, name FROM sample WHERE Age = 25'; // 'Age' with different case
    const result = await executeSELECTQuery(query);

    // Assert that a single result is returned
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0].id).toBe('2'); // Assuming '2' is the expected id for 'age = 25'
});

// Test for case-insensitive field selection
test('Execute SQL Query with case-insensitive field selection', async () => {
    const query = 'SELECT ID, NAME FROM sample'; // Field names with different case
    const result = await executeSELECTQuery(query);

    // Validate correct fields are selected, regardless of case
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).not.toHaveProperty('age'); // Ensures only expected fields are returned
});

// Test for non-existent field in WHERE clause
test('Execute SQL Query with non-existent WHERE clause field', async () => {
    const query = 'SELECT id, name FROM sample WHERE nonExistentField = 25'; // Field does not exist
    const result = await executeSELECTQuery(query);

    // Expect no results since the WHERE clause field doesn't exist
    expect(result.length).toBe(0); // No matching results
});

// Test for non-matching WHERE clause
test('Execute SQL Query with non-matching WHERE clause', async () => {
    const query = 'SELECT id, name FROM sample WHERE age = 99'; // No data with 'age = 99'
    const result = await executeSELECTQuery(query);

    // Validate empty result set for non-matching WHERE clause
    expect(result.length).toBe(0); // No matching records
});
