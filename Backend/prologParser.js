
//Transforma variables internas de Prolog (_1234) en letras legibles (A, B, C...)

function humanizarVariables(text) {
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

// Convierte el trace (texto secuencial) en un árbol JSON (jerárquico)

function parseTraceToTree(traceText) {
    const lines = traceText.split('\n');
    
    // Creamos una raíz virtual para agrupar todo
    const root = { level: 0, goal: "Root", children: [] };
    const stack = [root]; 

    // Regex para capturar: Puerto, Nivel (ignorando espacios) y la Meta (Goal)
    const regex = /(Call|Exit|Fail|Redo):\s*\(\s*(\d+)\s*\)\s*(.*)/;

    lines.forEach(line => {
        const match = line.match(regex);
        if (!match) return; // Si la línea no es del trace, la ignoramos

        const [_, port, levelStr, rawGoal] = match;
        const level = parseInt(levelStr, 10);
        
        // Limpiamos el objetivo (quitamos el '?' del final y espacios extra)
        const goal = rawGoal.replace(/\s*\?$/, '').trim();

        if (port === 'Call') {
            const newNode = {
                level: level,
                goal: goal,
                status: 'pending', // Estado inicial
                children: []
            };

            // Retrocedemos en la pila si hubo backtracking (niveles anteriores)
            while (stack.length > 1 && stack[stack.length - 1].level >= level) {
                stack.pop();
            }

            // Añadimos el nuevo nodo como hijo del nodo actual en la cima de la pila
            stack[stack.length - 1].children.push(newNode);
            // Y lo metemos en la pila porque ahora estamos "dentro" de él
            stack.push(newNode);

        } else if (port === 'Exit') {
            // Éxito: Buscamos el nodo en la pila y lo marcamos de verde
            const node = stack.find(n => n.level === level);
            if (node) {
                node.status = 'success';
                node.goal = goal; // Actualizamos por si Prolog instanció variables (ej: A -> pedro)
            }
        } else if (port === 'Fail') {
            // Fallo: Lo marcamos de rojo
            const node = stack.find(n => n.level === level);
            if (node) {
                node.status = 'fail';
            }
        }
        // Nota: Los eventos 'Redo' significan que Prolog intenta otra rama. 
        // El siguiente 'Call' creará automáticamente al hermano gracias al 'while' de arriba.
    });

    // Retornamos los hijos de la raíz virtual (usualmente es un solo nodo: la consulta principal)
    return root.children;
}

module.exports = { 
    humanizarVariables,
    parseTraceToTree
};