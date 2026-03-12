//Se encarga de ejecutar prolog

const { exec } = require("child_process");

function runProlog(programFile, query){

    return new Promise((resolve,reject)=>{

        const cmd =
        `swipl -q -f prolog/trace_runner.pl -g "run('${programFile}', ${query}), halt."`;

        exec(cmd,(err,stdout,stderr)=>{

            if(err){
                reject(stderr);
                return;
            }

            const lines = stdout.trim().split("\n");

            const events = lines.map(line=>{

                const [type,level,goal] = line.split("|");

                return {
                    type,
                    level: parseInt(level),
                    goal
                };

            });

            resolve(events);

        });

    });

}

module.exports = { runProlog };