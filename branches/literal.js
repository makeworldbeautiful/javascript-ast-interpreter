module.exports = {
    types: ['Literal'],
    reduce: (node) => {
        return node.value;
    }
}