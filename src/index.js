const {parseQuery} = require('./queryParser');
const readCSV = require('./csvReader');
const fs= require('fs');
async function executeSELECTQuery(query) {
    
    
    const { fields, table, whereClauses, joinTable, joinCondition } = parseQuery(query);
    const csvPath = `./${table}.csv`;
   
    let data = await readCSV(csvPath);
    
   
    if (joinTable && joinCondition) {
        const joinData = await readCSV(`${joinTable}.csv`);
        switch (joinType.toUpperCase()) {
            case 'INNER':
                data = performInnerJoin(data, joinData, joinCondition, fields, table);
                break;
            case 'LEFT':
                data = performLeftJoin(data, joinData, joinCondition, fields, table);
                break;
            case 'RIGHT':
                data = performRightJoin(data, joinData, joinCondition, fields, table);
                break;
            // Handle default case or unsupported JOIN types
        }
    }
    const filteredData = whereClauses.length > 0
    ? data.filter(row => whereClauses.every(clause => evaluateCondition(row, clause)))
    : data;
    
    return filteredData.map(row => {
        const selectedRow = {};
        fields.forEach(field => {
            // Assuming 'field' is just the column name without table prefix
            selectedRow[field] = row[field];
        });
        return selectedRow;
    });
}

function evaluateCondition(row, clause) {
    const { field, operator, value } = clause;
    switch (operator) {
        case '=': return row[field] === value;
        case '!=': return row[field] !== value;
        case '>': return row[field] > value;
        case '<': return row[field] < value;
        case '>=': return row[field] >= value;
        case '<=': return row[field] <= value;
        default: throw new Error(`Unsupported operator: ${operator}`);
    }
}

function performInnerJoin(leftData, rightData, joinCondition) {
    const { left, right } = joinCondition;

    return leftData.filter(leftRow => 
        rightData.some(rightRow => leftRow[left] === rightRow[right])
    ).map(leftRow => {
        const rightRow = rightData.find(row => row[right] === leftRow[left]);
        return { ...leftRow, ...rightRow }; // Merging data
    });
}

function performLeftJoin(leftData, rightData, joinCondition) {
    const { left, right } = joinCondition;

    return leftData.map(leftRow => {
        const rightRow = rightData.find(row => row[right] === leftRow[left]);
        return { ...leftRow, ...rightRow }; // Merging data, with possible null values
    });
}

function performRightJoin(rightData, leftData, joinCondition) {
    const { left, right } = joinCondition;

    return rightData.map(rightRow => {
        const leftRow = leftData.find(row => row[left] === rightRow[right]);
        return { ...rightRow, ...leftRow }; // Merging data, with possible null values
    });
}


module.exports = executeSELECTQuery;
