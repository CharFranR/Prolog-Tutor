const { runProlog } = require("./services/prologService");
const { buildSLDTree } = require("./utils/traceParser");

(async ()=>{

    const events = await runProlog("prolog/program.pl","abuelo(X,luis)");

    const tree = buildSLDTree(events);

    console.log(JSON.stringify(tree,null,2));

})();