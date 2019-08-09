module.exports = {
    types: ['ObjectPattern'],
    reduce: (node, scope, reduce) => {
        let r = {};
        node.properties.forEach(n => {
            r[n.key.name] = reduce(n.value);
        });
        return r;
    }
}