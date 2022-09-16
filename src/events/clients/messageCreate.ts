import { Message } from 'discord.js';
import { MessageConfig } from '../../config/bot.json';
import { CommandRunner } from '../../utils/Command';

export async function CreateMessage(message: Message<boolean>) {
    const
        isCMD: boolean = (message.content.startsWith(MessageConfig.Prefix)),
        args: string[] = message.content.split(/\s+/),
        cmd: string | undefined = args.shift()?.toLowerCase().replace(MessageConfig.Prefix, '');
    if (isCMD && !message.author.bot)
        CommandRunner(cmd, args, message.client, message);
}