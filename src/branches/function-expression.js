const createFunction = require('./utils/create-function');

module.exports = {
    types: ['FunctionExpression'],
    reduce: (node, scope, reduce, type, context) => {
        if(type !== 'context'){
            context = null;
        }
        return createFunction(node, scope, reduce, context);
    }
}