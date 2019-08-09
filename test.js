const acorn = require('./libs/acorn');
const Scope = require('./cls/scope');

const raiseError = require('./utils/error');
const prescan = require('./main/prescan');
const branches = require('./main/acorn-branches');
const reduce = require('./main/reducer')(branches);

const test = (code) => {
    const scope = new Scope({
        // window: {},
        log: console.log,
        console,
    });
    const ast = acorn.parse(code);
    let OUTPUT;

    try {
        let val = reduce(ast, scope);
    } catch(err){
        raiseError(err, code);
    }
    

    // console.log({ OUTPUT })


    // console.log(scope.output())
}



let
code = 'var a = 1';
code = `
var a = 1
a + 100;
var b = 2;
`;
code = `
var a = 1
log(a)
`;

code = `
var a = { b: { c: 1 } }
a.z = a.b;
a.x = a.b.c;
a.y = a.b.c.e;
console.log(a)
`;

code = `
console.log(a)
var a = 1
console.log(a)
`;

code = `
console.log(add(1,2))
function add(a,b){
    return a+b
}
`;

code = `
console.log(add(1,2))
function add(a,b,c=0.1){
    return z(a,b)+c
    function z(a,b){return a+b}
}
`;


test(code);
// console.log(topScope)

// throw new ReferenceError('aaa')

