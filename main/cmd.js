const acorn = require('../libs/acorn');
const Scope = require('../cls/scope');

const raiseError = require('../utils/error');
const branches = require('./acorn-branches');
const reduce = require('./reducer')(branches);

module.exports = (scope, code) => {

    const exports = {};
    const topScope = new Scope({
        exports,
        module: { exports },
        ...scope
    });
    const ast = acorn.parse(code);
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
};