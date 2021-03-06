const createFunction = (node, scope, reduce) => {
    const _scope = scope.createSub();
    const f = function(){
        _scope.context = this;
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
        // f.name = node.id.name;
        _scope.set('function', node.id.name, f);
    }
    return f;
};

module.exports = createFunction;