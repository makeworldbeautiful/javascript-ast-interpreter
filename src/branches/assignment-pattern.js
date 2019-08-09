module.exports = {
    types: ['AssignmentPattern'],
    reduce: (node, scope, reduce) => {
        let id = reduce(node.left);
        let val = reduce(node.right);
        scope.set('var', id, val);
        return id;
    }
}