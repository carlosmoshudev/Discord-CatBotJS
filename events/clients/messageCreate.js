const { MessageConfig: config } = require('../../config/bot.json');
const { loader: Load, runner: Run } = require('../../utils/Command');
module.exports                  = async message =>
{
    const isCMD = (message.content.startsWith(config.Prefix));
    if(!isCMD || message.author.bot) return;
    const args  = message.content.split(/\s+/);
    const cmd   = args.shift().toLowerCase().replace(config.Prefix, '');
    if(!Load().includes(`${cmd}.js`)) return;
    Run(cmd, message);
}