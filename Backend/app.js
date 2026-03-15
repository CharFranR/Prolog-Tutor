const { spawn } = require('child_process');
const { humanizarVariables, parseTraceToTree } = require('./prologParser');

const swipl = spawn('swipl', ['-q', '--no-tty'], {
    stdio: ['pipe', 'pipe', 'pipe']
});

let output = '';
let traceData = '';

swipl.stdout.on('data', (data) => {
    output += data.toString();
});

swipl.stderr.on('data', (data) => {
    traceData += data.toString();
});

swipl.on('close', (code) => {
    console.log(`Proceso terminado con código: ${code}`);
    
    // 1. Limpiamos las variables (ej: _1234 -> A)
    const traceLimpio = humanizarVariables(traceData);
    
    // 2. Convertimos el texto a JSON jerárquico
    const arbolJSON = parseTraceToTree(traceLimpio);
    
    // Imprimimos el JSON formateado
    console.log(JSON.stringify(arbolJSON, null, 2));
});

const comandos = [
    "leash(-all).",
    "visible(+all).",
    "consult('prolog/program.pl').", 
    "trace.",
    "abuelo(X, Y).",
    "notrace.",
    "halt."
];

swipl.stdin.write(comandos.join('\n'));   
swipl.stdin.end();