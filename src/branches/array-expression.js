module.exports = {
    types: ['ArrayExpression'],
    reduce: (node, scope, reduce) => {
        let arr = node.elements.map(e => reduce(e, scope));
        return arr;
    }
}