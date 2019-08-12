const createFunction = require('./utils/create-function');

module.exports = {
    types: ['FunctionExpression'],
    reduce: (node, scope, reduce) => {
        return createFunction(node, scope, reduce);
    }
}