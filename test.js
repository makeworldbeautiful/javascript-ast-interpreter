const acorn = require('./libs/acorn');
const Scope = require('./cls/scope');

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
    ast.body.forEach(node => {
        let val = reduce(node, scope);
        if(typeof(val) !== 'undefined'){
            OUTPUT = val;
        }
    });

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
console.log(b)
var a = 1
`;
test(code);
// console.log(topScope)


