const {
    _classCallCheck,
    _createClass,
    _inherits,
    _possibleConstructorReturn,
    _getPrototypeOf,
} = require('./utils/class');

module.exports = {
    types: ['ClassBody'],
    reduce: (node, scope, reduce, superClass) => {

        const props = {}, superProto = {};
        if(superClass){
            Object.assign(superProto, Object.getOwnPropertyDescriptors(superClass.prototype));
            Object.assign(props, superProto);
        }
       
        const methods = node.body.map(n => reduce(n, scope, 'class', superClass, superProto));
        // console.log(methods)
        let stru = methods.findIndex(m => m.key === 'constructor'), cls;
        if(stru > -1){
            stru = methods.splice(stru, 1)[0].value;
        }
        cls = function(...args){
            const _this = this;
            scope.context = _this;
            scope.getContext = function(){
                return _this;
            }
            if(typeof(stru) === 'function'){
                stru.apply(this, args);
            }
        }
        
        methods.forEach(m => {
            // console.log(1111, m.key, Object.getOwnPropertyDescriptor(cls.prototype, m.key))
            if(!(m.key in props)){
                props[m.key] = {
                    configurable: true,
                    enumerable: false,
                };
            }
            switch(m.kind){
                case 'method':
                    props[m.key].value = m.value;
                    break;
                case 'get':
                case 'set':
                    props[m.key][m.kind] = function(...args){
                        // console.log(666, m.kind, scope.super, scope.context)
                        // return m.value.bind(this)(...args)
                        return m.value.apply(scope.context, args);
                    };
                    break;
                default:
                    let err = `NOT IMPLEMENT CLASS METHOD: ${m.kind}`;
                    break;
            }
        });
        // // let aaa = {};
        // // // console.log(222,props)
        // // Object.defineProperties(aaa, props);
        // // aaa.type = 'aaa';
        // // console.log(333333, Object.create(aaa).type)

        // console.log(922222, props)


        Object.defineProperties(cls.prototype, props);
        cls.prototype.constructor = cls;
        // console.log(99999,new cls('aaa').type)
        return cls;
    }
}