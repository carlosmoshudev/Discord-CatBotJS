const { readdirSync: read, existsSync: exists } = require('fs')
const dir = `${process.cwd()}/commands/`;
module.exports =
{
    loader: () =>
    {
        const cmds = [];
        read(dir).forEach(cat => read(`${dir}${cat}`).forEach(cmd => cmds.push(cmd)));
        return cmds;
    },
    runner: (cmd, message) =>
    {
        read(dir).forEach(cat => 
            { 
                const commandPath = `${dir}${cat}/${cmd}.js`;
                if(exists(commandPath))
                { 
                    let command = require(commandPath);
                    caller = new command(message.client);
                    caller.run(message);
                }
                else return;
            });
    }
}