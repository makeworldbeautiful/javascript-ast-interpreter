module.exports = {
    types: ['ThisExpression'],
    reduce: (node, scope, reduce) => {
        if(typeof(scope.context) === 'undefined'){
            return null;
        } else {
            return scope.context;
        }
    }
}