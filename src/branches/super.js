module.exports = {
    types: ['Super'],
    reduce: (node, scope, reduce, type, ...args1) => {
        return scope.getSuper();
    }
}