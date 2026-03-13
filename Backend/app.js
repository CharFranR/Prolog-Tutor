const { spawn } = require('child_process');

const swipl = spawn('swipl', ['-q', '--no-tty'], {
    stdio: ['pipe', 'pipe', 'pipe']
});

let output = '';
let traceData = '';

swipl.stdout.on('data', (data) => {
    console.log('STDOUT:', data.toString());
    output += data.toString();
});

swipl.stderr.on('data', (data) => {
    console.log('TRACE/STDERR:', data.toString());
    traceData += data.toString();
});

swipl.on('close', (code) => {
    console.log(`Proceso terminado con código: ${code}`);
});

// Comandos mejorados: aseguran carga, trace completo y cierre
const comandos = [
    "leash(-all).",           // No pausar en ningún puerto
    "visible(+all).",         // Mostrar todos los eventos del trace
    "consult('prolog/program.pl').", // Cargar archivo
    "trace.",                 // Activar trace
    "abuelo(X, Y).",        // Consulta
    "notrace.",               // Desactivar trace
    "halt."                   // Cerrar el proceso explícitamente
];

swipl.stdin.write(comandos.join('\n'));   
swipl.stdin.end(); // Cerrar stdin para indicar que no hay más comandos