module.exports = {
    types: ['Property'],
    reduce: (node, scope, reduce, parent) => {
        let key = node.key.name;
        let val = reduce(node.value, scope, 'context', parent);
        parent[key] = val;
        return val;
    }
}