const initArguments = (params, args, scope, reduce) => {
    params.forEach((param, i) => {
        let initValue = args[i];
        switch(param.type){
            case 'Identifier':
                scope.set('var', param.name, initValue);
                break;
            case 'AssignmentPattern':
                if(i >= args.length){
                    initValue = reduce(param.right, scope);
                }
                // if(typeof(initValue) === 'undefined'){
                //     initValue = reduce(param.right, scope);
                // }
                scope.set('var', param.left.name, initValue);
                break;
            default:
                console.log(param)
                break;
        }
    })
};

const createFunction = (node, scope, reduce) => {
    const _scope = scope.createSub();
    const f = function(){
        initArguments(node.params, arguments, _scope, reduce);
        return reduce(node.body, _scope);
    };
    if(node.id){
        f.name = node.id.name;
        scope.set('function', node.id.name, f);
    }
    return f;
}

module.exports = {
    types: ['FunctionDeclaration'],
    reduce: (node, scope, reduce, type) => {
        // 预扫描不去重
        if(type === 'prescan'){
            return createFunction(node, scope, reduce)
        }
        // 有function名称定义的尝试查找预扫描定义
        else if(node.id) {
            if(scope.exists(node.id.name)){
                return scope.getValue(node.id.name)
            } else {
                return createFunction(node, scope, reduce)
            }
        }
        // 匿名函数
        else {
            return createFunction(node, scope, reduce);
        }
    }
}