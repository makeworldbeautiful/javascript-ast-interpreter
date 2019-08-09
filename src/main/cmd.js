const Scope = require('../cls/scope');
const { isObject } = require('../utils/type');
const branches = require('./acorn-branches');
const reduce = require('./reducer')(branches);
// const raiseError = require('../utils/error');

module.exports = parser => {
    return (scope, code) => {

        if(!isObject(scope)){
            scope = {};
        }
    
        const exps = {};
        const topScope = new Scope(Object.assign({}, {
            'exports': exps,
            'module': { 'exports': exps },
        }, scope));
        const ast = parser.parse(code);
        let output;
    
        try {
            let val = reduce(ast, topScope);
            if(typeof(val) !== 'undefined'){
                output = val;
            }
        } catch(err){
            throw err;
            // raiseError(err, code);
        }
    
        return topScope.output().module.exports;
    }
};