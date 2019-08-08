module.exports = {
    types: ['Property'],
    reduce: (node, scope, reduce, parent) => {
        let key = node.key.name;
        let val = reduce(node.value, scope);
        parent[key] = val;
    }
}