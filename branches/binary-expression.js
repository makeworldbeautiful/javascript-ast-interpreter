const BINARY = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '^': (a, b) => a ^ b,
    '|': (a, b) => a | b,
    '&': (a, b) => a & b,
};

module.exports = {
    types: ['BinaryExpression'],
    reduce: (node, scope, reduce) => {
        let { operator } = node;
        let left = reduce(node.left, scope);
        let right = reduce(node.right, scope);
        return BINARY[operator](left, right);
    }
}