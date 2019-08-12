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
console.log(aa,b,c);
zz
`

code = 'const a = "abc";var b=`++${999}a:${a}456=${99 * 2}-${a}--`;console.log(a,b)'

code = `
console.log(b)
function b(){}
`

code = `
const obj = {
    b: function a(v){
        console.log(v, a, this)
        var a;
    },
    c: {
        b: function a(v){
            console.log(v, this)
        }
    }
};
obj.b(1)
obj.c.b(1)
console.log(this)
module.exports = obj
`

// code = `
// console.log(Object)
// `

// code = `
// console.log(Object.create(null))
// `

// code = `
// console.log(new Object({ a: 1 }))
// `

// code = `
// class A {
//     constructor(name){
//         // console.log(name, this);
//         this.name = name;
//         this._type = 'A';
//     }
//     getName(){
//         return this.name + ':' + this.type;
//     }
//     get type(){
//         return this._type;
//     }
//     set type(val){
//         this._type = val;
//     }
// }

// let a = new A(123);
// console.log(11111, a.getName(), a.type);

// class B extends A {
//     constructor(name){
//         super(name);
//         this._type = 'B';
//     }
//     get type(){
//         // console.log(7777, this)
//         return super.type + ':' + this._type;
//     }
// }

// let b = new B(456);
// console.log(22222, b.getName(), b.type);

// class C extends B {
//     constructor(name){
//         super(name);
//         this._type = 'C';
//     }
//     get type(){
//         // console.log(7777, this)
//         return super.type + ':' + this._type;
//     }
// }

// let c = new C(456);
// console.log(333333, c.getName(), c.type);

// `



module.exports = code;