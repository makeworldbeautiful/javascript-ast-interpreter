module.exports = {
    types: ['ClassDeclaration'],
    reduce: (node, scope, reduce) => {
        const className = reduce(node.id);
        const superClass = reduce(node.superClass, scope);
        const _scope = scope.createSub();
        const body = reduce(node.body, _scope, superClass);
        scope.set('class', className, body);
        return body;
    }
}