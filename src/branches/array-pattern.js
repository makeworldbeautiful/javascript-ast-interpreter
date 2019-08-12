module.exports = {
    types: ['ArrayPattern'],
    reduce: (node, scope, reduce) => {
        let arr = node.elements.map(e => reduce(e, scope, 'get'));
        return arr;
    }
}