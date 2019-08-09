
const { cmd } = require('./index');
const code = require('./test-code');


let output = cmd({
    // window: {},
    log: console.log,
    console,
}, code);

output.b(1)
output.c.b(2)
// throw new ReferenceError('aaa')

