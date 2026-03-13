const swipl = require('swipl-stdio');
const engine = new swipl.Engine();

(async () => {
    try {
        // Cargar el archivo .pl
        await engine.call("consult('prolog/program.pl').");

        // Ahora puedes hacer consultas
        const result = await engine.call("abuelo(X, Y).");
        console.log(result); // { X: 'maria' }

        // Activar trace si necesitas ver el rastreo
        await engine.call("trace.");
        
    } catch (err) {
        console.error(err);
    } finally {
        engine.close();
    }
})();   