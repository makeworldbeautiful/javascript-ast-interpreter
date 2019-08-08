module.exports = {
    types: ['MemberExpression'],
    reduce: (node, scope, reduce, type, value) => {
        let obj = reduce(node.object, scope);
        let prop = node.property.name;
        if(type === 'set'){
            return obj[prop] = value;
        } else {
            return obj[prop];
        }
    }
}