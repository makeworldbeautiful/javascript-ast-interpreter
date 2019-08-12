module.exports = {
    types: ['TemplateElement'],
    reduce: (node, scope, reduce) => {
        // console.log(node)
        return node.value.cooked;
    }
}