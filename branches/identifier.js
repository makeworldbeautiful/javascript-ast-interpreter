module.exports = {
    types: ['Identifier'],
    reduce: (node, scope, reduce, type, value) => {
        if(type === 'set'){
            scope.setValue(node.name, value);
            // console.log(11111222, node.name, type, value)
            return value;
        } else {
            try {
                return scope.getValue(node.name);
            } catch(err){
                err.message += ` #[${node.start},${node.end}]`;
                throw err;
            }
        }
    }
}