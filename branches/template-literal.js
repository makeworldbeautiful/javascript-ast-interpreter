module.exports = {
    types: ['TemplateLiteral'],
    reduce: (node, scope, reduce) => {
        let { expressions, quasis } = node;
        let val = quasis.reduce((r, v, i) => {
            let exp = reduce(expressions.shift(), scope);
            let qua = reduce(v);
            return `${r}${exp}${qua}`;
        }, reduce(quasis.shift()));
        return val;
    }
}