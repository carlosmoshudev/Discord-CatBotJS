const { MessageConfig: config } = require('../../config/bot.json');
const { Loader: Load, Runner: Run } = require('../../utils/Command');
module.exports                  = async message =>
{
    const isCMD = (message.content.startsWith(config.Prefix));
    if(!isCMD || message.author.bot) return;
    const args  = message.content.split(/\s+/);
    const cmd   = args.shift().toLowerCase().replace(config.Prefix, '');
    if(!message.client.commands.map(c => c.command).includes(cmd)) 
    {
        //TODO: check aliases
        return;
    };
    Run(cmd, message);
}