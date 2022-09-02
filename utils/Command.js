const { readdirSync: read, existsSync: exists } = require('fs')
const dir = `${process.cwd()}/commands/`;
module.exports =
{
    Loader: client =>
    {
        const cmds = [];
        read(dir).forEach(
            cat => read(`${dir}${cat}`).forEach(
                cmd => 
                { 
                    if(cmd.endsWith('js'))
                    {
                        const builder = require(`${dir}${cat}/${cmd}`);
                        cmds.push
                        (
                            {
                                command: cmd.replace('.js',''),
                                class: new builder(client)
                            }
                        )
                    }
                }
            )
        );
        return cmds;
    },
    Runner: (cmd, message) =>
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