const oStr = Object.prototype.toString;
const tStr = v => oStr.call(v).slice(8, -1);
const tstr = v => typeof(v);

const output = {
    typeString: tStr,
    
    isNull: v => v === null,
    isUndefined: v => tstr(v) === 'undefined',

    isObject: v => tStr(v) === 'Object',
    isArray: v => tStr(v) === 'Array',

    isFunction: v => tstr(v) === 'function',
    isNumber: v => tstr(v) === 'number',
    isString: v => tstr(v) === 'string',

    isNil: v => this.isNull(v) || this.isUndefined(v),
    isInvalid: v => this.isNil(v) || (this.isNumber(v) && isNaN(v)),
    isEmptyString: v => this.isNil(v) || (this.isString(v) && v.length < 1),
};

module.exports = output;