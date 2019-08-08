const Scope = require('./cls/scope');

let topScope = new Scope({
    a: 1, b: 2
});

let sc = topScope.createSub();

console.log(sc.getValue('b'))