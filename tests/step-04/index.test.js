const executeSELECTQuery = require('../../src/index');

test('Execute SELECT query on sample table and verify results', async () => {
    const query = 'SELECT id, name FROM sample';
    const result = await executeSELECTQuery(query);

    expect(result.length).toBeGreaterThan(0);

    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');

    expect(result[0]).not.toHaveProperty('age');

    expect(result[0]).toEqual({ id: '1', name: 'John' });
});
