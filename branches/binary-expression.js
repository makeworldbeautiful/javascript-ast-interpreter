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
        let val = BINARY[operator](left, right);
        // console.log(left, operator, right, val)
        return val;
    }
}