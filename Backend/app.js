const { spawn } = require('child_process');
const { TransformarVariables } = require('./prologParser');

//Inicia el SWI-Prolog
const swipl = spawn('swipl', ['-q', '--no-tty'], {
    stdio: ['pipe', 'pipe', 'pipe']
});

let output = '';
let traceData = '';

//captura la respuesta final
swipl.stdout.on('data', (data) => {
    output += data.toString();
});
// captura el proceso del programa (trace)
swipl.stderr.on('data', (data) => {
    traceData += data.toString();
});

swipl.on('close', (code) => {
    console.log(`Proceso terminado con código: ${code}`);
    
    // Usamos la función importada para limpiar el rastro
    const traceLimpio = TransformarVariables(traceData);
    
    console.log("\n--- TRACE HUMANIZADO ---");
    console.log(traceLimpio);
});

// Comandos importantes para hacer la consulta
const comandos = [
    "leash(-all).", // desactiva el leash para ver todo el proceso de trace
    "visible(+all).", // hace visibles todos los predicados en el trace
    "consult('prolog/program.pl').", // carga el programa de prolog
    "trace.", // activa el trace
    "abuelo(X, Y).", // realiza la consulta
    "notrace.", // desactiva el trace para evitar más salidas
    "halt." // termina la ejecución de SWI-Prolog
];

swipl.stdin.write(comandos.join('\n')); // enviar los comandos a SWI-Prolog  
swipl.stdin.end(); // indica que no se enviarán más datos a la entrada estándar