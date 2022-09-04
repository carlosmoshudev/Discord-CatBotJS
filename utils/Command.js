const { readdirSync: read, existsSync: exists } = require('fs')
const dir = `${process.cwd()}/commands/`;
module.exports =
{
    Loader: client =>
    {
        const cmds = [];
        read(dir).forEach(cat => read(`${dir}${cat}`).forEach(cmd => { if(cmd.endsWith('js'))
                    {
                        const builder = require(`${dir}${cat}/${cmd}`);
                        cmds.push
                        ({
                            command: cmd.replace('.js',''),
                            class: new builder(client)
                        })}}));
        return cmds;
    },
    Runner: (cmd, args, client, message) =>
    {
        const cmdInstance = client.commands.filter(c => c.command === cmd)[0];
        const aliasInstance = client.commands.filter(c => c.class.aliases.includes(cmd))[0];
        const cmdClass = cmdInstance? cmdInstance.class : aliasInstance?.class;
        cmdClass?.run(message, args);
    }
}