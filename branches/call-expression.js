module.exports = {
    types: ['CallExpression'],
    reduce: (node, scope, reduce, context) => {
        let callee = reduce(node.callee, scope);
        let args = node.arguments.map(n => reduce(n, scope));
        return callee.apply(context, args);
    }
}