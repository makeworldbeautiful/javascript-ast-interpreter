module.exports = {
    types: ['MethodDefinition'],
    reduce: (node, scope, reduce, type, superClass) => {
        if(type === 'class'){
            let { kind } = node, key, value;
            switch(kind){
                case 'constructor':
                    let constructorScope = scope.createSub();
                    constructorScope.super = (...args) => {
                        if(typeof(superClass) === 'function'){
                            superClass.apply(constructorScope.getContext(), args);
                        }
                    };
                    key = reduce(node.key);
                    value = reduce(node.value, constructorScope, 'class', kind);
                    return { key, kind, value };
                case 'method':
                case 'get':
                case 'set':
                    let methodScope = scope.createSub();
                    if(superClass){
                        methodScope.super = superClass.prototype;
                    }
                    key = reduce(node.key);
                    value = reduce(node.value, methodScope, 'class', kind);
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