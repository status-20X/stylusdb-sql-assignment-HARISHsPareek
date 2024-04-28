const {parseQuery} = require('../../src/queryParser');

test('Parse SQL Query successfully', () => {
    const query = 'SELECT id, name FROM sample';
    const parsed = parseQuery(query);
    expect(parsed).toEqual({
        fields: ['id', 'name'],
        table: 'sample',
    });
});

test('Throw error on invalid SQL Query', () => {
    const invalidQuery = 'SELECT * WHERE id = 1'; 

    expect(() => {
        parseQuery(invalidQuery);
    }).toThrow(); 
});


test('Throw error with specific message', () => {
    const invalidQuery = 'SELECT * FROM';
    
    expect(() => {
        parseQuery(invalidQuery); // This should raise an error
    }).toThrow('Invalid SELECT format'); // Correct expected message
});

