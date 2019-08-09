const createFunction = (node, scope, reduce) => {
    const _scope = scope.createSub();
    const f = function(){
        let id, args = Array.prototype.slice.call(arguments, 0);
        node.params.forEach((param, i) => {
            id = reduce(param, scope, 'get');
            if(i < args.length){
                _scope.set('var', id, args[i])
            }
        });
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