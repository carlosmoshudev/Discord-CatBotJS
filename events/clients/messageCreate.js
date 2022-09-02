const { Message } = require('../../config/bot.json');
module.exports = async message =>
{
    const isCMD = (message.content.startsWith(Message.Prefix));
    if(!isCMD || message.author.bot) return;
    const args  = message.content.split(/\s+/);
    const cmd   = args.shift().toLowerCase().replace(Message.Prefix, '');
    //TODO: handle cmd
    console.log(cmd);
}