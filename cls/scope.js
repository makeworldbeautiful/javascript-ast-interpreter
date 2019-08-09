const { isObject, isArray, isString } = require('../utils/type');

class ScopeItem {
    constructor(kind, id, parent, value){

        this.kind = kind;
        this.id = id;
        this.value = value;
        this.context = null;

        // this.setValue = (val) => {
        //     return value = val;
        // }
        // this.setKind = (k) => {
        //     return kind = k;
        // }

        Object.defineProperties(this, {
            'parent': { get: () => parent },
            // 'id': { get: () => id },
            // 'value': { get: () => value },
            // 'kind': { get: () => kind },
        })
    }

    setValue(val){
        return this.value = val;
    }
    setKind(k){
        return this.kind = k;
    }
}

class Scope {
    constructor(scope, parent){
       
        Object.defineProperties(this, {
            'parent': { get: () => parent instanceof Scope ? parent : null },
        })

        this.init(scope);
    }

    getTopScope(){
        if(!this.parent){
            return this;
        }
        return this.parent.getTopScope();
    }

    init(scope){
        if(!isObject(scope)){
            scope = {};
        }
        this.scope = [];
        Object.keys(scope).forEach(id => this.set('var', id, scope[id]))
    }

    set(kind, id, value){
        if(isString(id)){
            let item = this.scope.find(it => it.id === id);
            if(!item){
                item = new ScopeItem(kind, id, this, value);
                this.scope.unshift(item);
            } else {
                item.setValue(value);
                item.setKind(kind);
            }
        }
        // 对象解构赋值
        else if(isObject(id)){
            Object.keys(id).forEach(k => {
                let _id = id[k];
                let _value = value[k];
                this.set(kind, _id,  _value);
            })
        }
        else if(isArray(id)){
            let len = value.length;
            id.forEach((_id, i) => {
                if(i < len){
                    this.set(kind, _id,  value[i]);
                }
            })
        }
    }

    setValue(id, value){
        let item = this.scope.find(it => it.id === id);
        if(!item){
            throw 'not define: ' + id;
            // let scope = this.getTopScope();
            // scope.set('global', id, value);
        } else {
            item.setValue(value);
        }
        // if(!item){
        //     item = new ScopeItem('var', id, this, value);
        // }
    }

    exists(id){
        if(this.scope.some(item => item.id === id)){
            return true;
        } else if(this.parent){
            return this.parent.exists(id);
        } else {
            return false;
        }
    }

    get(id){
        let item = this.scope.find(it => it.id === id);
        if(!item && this.parent){
            item = this.parent.get(id);
        }
        if(!item){
            const err = new ReferenceError(`${id} is not defined`);
            throw err;
        }
        return item;
    }

    getValue(id){
        let item = this.get(id);
        if(item){
            return item.value;
        }
    }

    createSub(){
        return new Scope({}, this);
    }

    output(){
        let r = {};
        let ids = this.scope.map(item => item.id);
        ids = ids.filter((v, i, vv) => vv.indexOf(v) === i);
        ids.forEach(id => {
            r[id] = this.getValue(id);
        })
        return r;
    }
}

module.exports = Scope;