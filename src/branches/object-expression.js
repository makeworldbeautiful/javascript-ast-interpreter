module.exports = {
    types: ['ObjectExpression'],
    reduce: (node, scope, reduce) => {
        let r = {};
        node.properties.forEach(n => reduce(n, scope, r));
        return r;
    }
}