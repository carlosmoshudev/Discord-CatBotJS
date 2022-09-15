import { MessageConfig } from '../../config/bot.json';
import { CommandRunner } from '../../utils/Command';
export async function CreateMessage(message) {
    const
        isCMD = (message.content.startsWith(MessageConfig.Prefix)),
        args = message.content.split(/\s+/),
        cmd = args.shift().toLowerCase().replace(MessageConfig.Prefix, '');
    if (isCMD && !message.author.bot)
        CommandRunner(cmd, args, message.client, message);
}