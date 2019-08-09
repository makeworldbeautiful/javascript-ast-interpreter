const acorn = require('./libs/acorn');
const Scope = require('./cls/scope');

const raiseError = require('./utils/error');
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
        throw err;
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

code = `
const o = { a: 1, b: 2, c: { d: { e: 3 } } };
var { a, c: { d: { e } } } = o;
console.log(a,e)
`;

code = `
const o = { a: 1, b: 2, c: { d: { e: 3 } } };
const a = { aaa: 1 }
a.c = o.c.d;
show(a, 'ccccccc')
function show({ c: a }, c = 0.2){
    console.log('a:', a, c)
}
`;

code = `
let zz = { z: 1, b: [9,8,7] };
let [{ a: aa }, b,c='ccccc']=[{ a: 1 }, zz];
console.log(aa,b,c)
`

code = 'const a = 123;var b=`a:${123}`;console.log(a,b)'

test(code);
// console.log(topScope)

// throw new ReferenceError('aaa')

