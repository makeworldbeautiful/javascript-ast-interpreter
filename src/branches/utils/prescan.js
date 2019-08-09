module.exports = (body, scope, reduce) => {
    body.forEach(node => {
        switch(node.type){
            case 'FunctionDeclaration':
                if(node.id){
                    let v = reduce(node, scope, 'prescan');
                    scope.set('function', node.id.name, v);
                }
                break;
            case 'VariableDeclaration':
                if(node.kind === 'var'){
                    node.declarations.forEach(n => {
                        scope.set('var', n.id.name, undefined);
                    })
                }
                break;
        }
    });
};