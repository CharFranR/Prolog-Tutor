
// Transforma variables internas de Prolog (_1234) en letras legibles (A, B, C...) para facilitar la compresión

function TransformarVariables(text) {
    const variablesMap = new Map();
    let variableCount = 0;
    
    const generarNombre = (index) => {
        const char = String.fromCharCode(65 + (index % 26));
        const num = Math.floor(index / 26);
        return num > 0 ? `${char}${num}` : char;
    };

    return text.replace(/_([G0-9]+)/g, (match) => {
        if (!variablesMap.has(match)) {
            variablesMap.set(match, generarNombre(variableCount++));
        }
        return variablesMap.get(match);
    });
}

module.exports = { TransformarVariables };