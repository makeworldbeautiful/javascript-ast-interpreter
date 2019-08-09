module.exports = {
    types: ['ThisExpression'],
    reduce: (node, scope, reduce) => {
        return scope.context || null;
    }
}