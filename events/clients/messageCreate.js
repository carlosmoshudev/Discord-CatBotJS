const { MessageConfig } = require('../../config/bot.json');
const { CommandRunner } = require('../../utils/Command');
module.exports          = async message =>
{
    const isCMD = (message.content.startsWith(MessageConfig.Prefix));
    if(!isCMD || message.author.bot) return;
    const args  = message.content.split(/\s+/);
    const cmd   = args.shift().toLowerCase().replace(MessageConfig.Prefix, '');
    CommandRunner(cmd, args, message.client, message);
}