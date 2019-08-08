module.exports = {
    types: ['AssignmentExpression'],
    reduce: (node, scope, reduce) => {
        let val = reduce(node.right, scope);
        reduce(node.left, scope, 'set', val)
    }
}