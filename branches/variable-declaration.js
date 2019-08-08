module.exports = {
    types: ['VariableDeclaration'],
    reduce: (node, scope, reduce) => {
        let { kind, declarations } = node;
        declarations.forEach(n => {
            scope.set(kind, n.id.name, reduce(n.init, scope));
        })
    }
}