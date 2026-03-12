function buildSLDTree(events){

    const baseLevel = events[0].level;

    let stack = [];
    let root = null;

    for(const e of events){

        const depth = e.level - baseLevel;

        if(e.type === "call"){

            const node = {
                goal: e.goal,
                children: []
            };

            if(depth === 0){
                root = node;
            }else{
                stack[stack.length-1].children.push(node);
            }

            stack.push(node);
        }

        if(e.type === "exit" || e.type === "fail"){
            stack.pop();
        }

    }

    return root;
}

module.exports = { buildSLDTree };