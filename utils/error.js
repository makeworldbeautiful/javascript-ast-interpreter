const buildErrorMessage = (err, code) => {
    let start = 0, end = 0;
    let message = err.replace(/\s+\#\[(\d+)\,(\d+)\]\s*$/, (_, $1, $2) => {
        start = $1 >> 0;
        end = $2 >> 0;
        return '';
    });
    const padSize = 3;
    const prefix = '  ';
    const beforLines = code.substring(0, start).split(/[\r\n]+/).map((s, i) => `${prefix}${(i + 1).toString().padStart(padSize, '0')} ${s}`);
    const lineNumber = beforLines.length;
    const bingoLine = beforLines.pop();
    const columnNumber = bingoLine.length;
    const lines = code.split(/[\r\n]+/).map((s, i) => `${prefix}${(i + 1).toString().padStart(padSize, '0')} ${s}`);
    lines.splice(lineNumber, 0, ' '.repeat(columnNumber) + '~'.repeat(end - start));
    const splitChar = '', splitLength = 20;

    let focus = lines.join('\n');
    return `${message} [${lineNumber}:${columnNumber}]`
        + `\n${prefix}${splitChar.repeat(splitLength)}\n${focus}\n${prefix}${splitChar.repeat(splitLength)}`
        + `\n`
}


const raiseError = (err, code) => {
    if(typeof(err) !== 'string'){
        return raiseError(err + '', code);
    };
    let msg = buildErrorMessage(err, code);
    throw msg;
};

module.exports = raiseError;