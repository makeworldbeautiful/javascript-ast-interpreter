const { isObject, isArray } = require('../utils/type');

class ScopeItem {
    constructor(kind, id, parent, value){

        this.kind = kind;
        this.id = id;
        this.value = value;

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

    get isTop(){
        return !this.parent;
    }

    get topScope(){

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
        let item = this.scope.find(it => it.id === id);
        if(!item){
            item = new ScopeItem(kind, id, this, value);
            this.scope.unshift(item);
        } else {
            item.setValue(value);
            item.setKind(kind);
        }
        return item;
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
        } else if(!this.isTop){
            return this.parent.exists(id);
        } else {
            return false;
        }
    }

    get(id){
        let item = this.scope.find(it => it.id === id);
        if(!item && !this.isTop){
            item = this.parent.get(id);
        }
        return item || null;
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