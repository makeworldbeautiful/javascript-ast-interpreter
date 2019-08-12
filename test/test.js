const acorn = require('../libs/acorn/6.2.1/acorn')
const cmd = require('../src/index').cmd(acorn);
const code = require('./test-code');

let output = cmd({
    // window: {},
    // log: console.log,
    console,
    Object,
    Array,
}, code);

console.log(output)


// throw new ReferenceError('aaa')

