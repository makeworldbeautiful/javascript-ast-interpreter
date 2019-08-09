module.exports = {
    types: ['VariableDeclaration'],
    reduce: (node, scope, reduce) => {
        let { kind, declarations } = node, val, id;
        declarations.forEach(n => {
            val = reduce(n.init, scope);
            id = reduce(n.id, scope, 'get');
            scope.set(kind, id, val);
        });
    }
}