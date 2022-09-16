import { Message } from 'discord.js';
import { MessageConfig } from '../../config/bot.json';
import { Run } from '../../utils/Command';
import { YellowLog, CyanLog, PurpleLog } from '../../.DevTools/cli';

export async function CreateMessage(message: Message<boolean>) {
    YellowLog("message create");
    const
        isCMD: boolean = (message.content.startsWith(MessageConfig.Prefix)),
        args: string[] = message.content.split(/\s+/),
        cmd: string | undefined = args.shift()?.toLowerCase().replace(MessageConfig.Prefix, '');
    if (isCMD && !message.author.bot)
        Run(cmd, args, message.client, message);
}