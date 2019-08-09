const prescan = require('./utils/prescan');
module.exports = {
    types: ['BlockStatement', 'Program'],
    reduce: (node, scope, reduce) => {

        prescan(node.body, scope, reduce);

        let val;
        node.body.some(n => {
            val = reduce(n, scope);
            if(n.type === 'ReturnStatement'){
                return true;
            }
        });
        return val;
    }
}