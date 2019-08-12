module.exports = {
    types: ['CallExpression'],
    reduce: (node, scope, reduce) => {
        let callee = reduce(node.callee, scope, 'call');
        let args = node.arguments.map(n => reduce(n, scope));
        return callee(...args);
    }
}