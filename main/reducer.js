module.exports = branches => {
    const reduce = (node, scope, ...extParams) => {
        let branch = branches.find(b => b.types.indexOf(node.type) > -1);
        if(!branch){
            console.log(node)
            let err = 'NOT IMPLEMENT AST-BRANCH TYPE: ' + node.type;
            throw err;
        }
        const val = branch.reduce(node, scope, reduce, ...extParams);
        // console.log(val)
        return val;
    };
    return reduce;
}