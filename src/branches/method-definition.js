module.exports = {
    types: ['MethodDefinition'],
    reduce: (node, scope, reduce, type, superClass) => {
        if(type === 'class'){
            let { kind } = node, key, value;
            switch(kind){
                case 'constructor':
                    let constructorScope = scope.createSub();
                    constructorScope.super = superClass;
                    key = reduce(node.key);
                    value = reduce(node.value, constructorScope, 'class', kind);
                    return { key, kind, value };
                case 'method':
                case 'get':
                case 'set':
                    key = reduce(node.key);
                    value = reduce(node.value, scope, 'class', kind);
                    return { key, kind, value };
                    // console.log(n, scope)
                default:
                    let err = `NOT IMPLEMENT CLASS METHOD: ${node.kind}`;
                    throw err;
                    break;
            }
        }
    }
}