const createFunction = require('./utils/create-function');

module.exports = {
    types: ['FunctionDeclaration'],
    reduce: (node, scope, reduce, type) => {
        // 预扫描不去重
        if(type === 'prescan'){
            return createFunction(node, scope, reduce);
        }
        // 有function名称定义的尝试查找预扫描定义
        else if(node.id) {
            if(scope.exists(node.id.name)){
                return scope.getValue(node.id.name)
            } else {
                let f = createFunction(node, scope, reduce);
                scope.set('function', node.id.name, f);
                return f;
            }
        }
        // 匿名函数
        else {
            let f = createFunction(node, scope, reduce);
            if(node.id){
                scope.set('function', node.id.name, f);
            }
            return f;
        }
    }
}