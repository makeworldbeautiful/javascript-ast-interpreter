module.exports = {
    types: ['NewExpression'],
    reduce: (node, scope, reduce) => {
        let { callee, arguments: args } = node;
        callee = reduce(callee, scope);
        args = args.map(n => reduce(n, scope));
        return new callee(...args)
    }
}