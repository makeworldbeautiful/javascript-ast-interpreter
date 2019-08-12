module.exports = {
    types: ['Super'],
    reduce: (node, scope, reduce, type) => {
        return (...args) => {
            // console.log(scope.context, 'scope.context')
            scope.getSuper().apply(scope.context, args)
        };
    }
}