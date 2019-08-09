module.exports = {
    types: ['ReturnStatement'],
    reduce: (node, scope, reduce) => {
        return reduce(node.argument, scope, reduce);
    }
}