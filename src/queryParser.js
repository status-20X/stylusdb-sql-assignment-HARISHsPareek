function parseQuery(query) {
    query = query.trim();

    // Parse JOIN information and remove it from the query
    const joinInfo = parseJoinClause(query);
    const joinPattern = /\s(INNER|LEFT|RIGHT) JOIN\s.+?\sON\s.+?=\s.+?/i;
    const queryWithoutJoin = query.replace(joinPattern, '');

    // Parse SELECT and other clauses from the query without JOIN
    const whereSplit = queryWithoutJoin.split(/\sWHERE\s/i);
    const mainQuery = whereSplit[0].trim(); // SELECT part
    const whereClause = whereSplit.length > 1 ? whereSplit[1].trim() : null;

    // Parse the SELECT part to extract fields and base table
    const selectRegex = /^SELECT\s(.+?)\sFROM\s(.+)/i;
    const selectMatch = mainQuery.match(selectRegex);

    if (!selectMatch) {
        throw new Error('Invalid SELECT format');
    }

    const [, fields, table] = selectMatch; // Only base table name

    // Parse WHERE clause if it exists
    const whereClauses = whereClause ? parseWhereClause(whereClause) : [];

    return {
        fields: fields.split(',').map(f => f.trim()), // Correct parsing of fields
        table: table.trim(), // Ensure correct base table name
        whereClauses,
        joinType: joinInfo.joinType,
        joinTable: joinInfo.joinTable,
        joinCondition: joinInfo.joinCondition,
    };
}







function parseWhereClause(whereString) {
    const conditionRegex = /(.*?)(=|!=|>|<|>=|<=)(.*)/;
    return whereString.split(/ AND | OR /i).map(conditionString => {
        const match = conditionString.match(conditionRegex);
        if (match) {
            const [, field, operator, value] = match;
            return { field: field.trim(), operator, value: value.trim() };
        }
        throw new Error('Invalid WHERE clause format');
    });
}

function parseJoinClause(query) {
    const joinRegex = /\s(INNER|LEFT|RIGHT) JOIN\s(.+?)\sON\s([\w.]+)\s*=\s*([\w.]+)/i;
    const joinMatch = query.match(joinRegex);

    if (joinMatch) {
        return {
            joinType: joinMatch[1].trim(),
            joinTable: joinMatch[2].trim(),
            joinCondition: {
                left: joinMatch[3].trim(),
                right: joinMatch[4].trim()
            }
        };
    }

    return {
        joinType: null,
        joinTable: null,
        joinCondition: null
    };
}



module.exports = { parseQuery, parseJoinClause };

