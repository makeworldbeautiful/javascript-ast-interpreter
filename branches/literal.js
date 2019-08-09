module.exports = {
    types: ['Literal', 'StringLiteral', 'NumberLiteral'],
    reduce: (node) => {
        return node.value;
    }
}