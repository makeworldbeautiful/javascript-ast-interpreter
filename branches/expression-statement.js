module.exports = {
    types: ['ExpressionStatement'],
    reduce: (node, scope, reduce, ...extParams) => reduce(node.expression, scope, ...extParams),
}