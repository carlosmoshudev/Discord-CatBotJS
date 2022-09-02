const { MessageConfig: config } = require('../../config/bot.json');
module.exports = async message =>
{
    const isCMD = (message.content.startsWith(config.Prefix));
    if(!isCMD || message.author.bot) return;
    const args  = message.content.split(/\s+/);
    const cmd   = args.shift().toLowerCase().replace(config.Prefix, '');
    //TODO: handle cmd
    console.log(cmd);
}