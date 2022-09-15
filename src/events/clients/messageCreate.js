const { Prefix } = require('../../config/bot.json').MessageConfig;
const { CommandRunner } = require('../../utils/Command');
module.exports = async message => {
    const
        isCMD = (message.content.startsWith(Prefix)),
        args = message.content.split(/\s+/),
        cmd = args.shift().toLowerCase().replace(Prefix, '');
    if (isCMD && !message.author.bot)
        CommandRunner(cmd, args, message.client, message);
}