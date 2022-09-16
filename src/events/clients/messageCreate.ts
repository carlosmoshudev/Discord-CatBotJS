import { Message, Client } from 'discord.js';
import { MessageConfig } from '../../config/bot.json';
import { Run } from '../../utils/Command';
import { YellowLog, CyanLog, PurpleLog } from '../../.DevTools/cli';

export async function CreateMessage(message: Message<boolean>) {
    const
        client: Client = message.client,
        args: string[] = message.content.split(/\s+/),
        cmd: string | undefined = args.shift()?.toLowerCase().replace(MessageConfig.Prefix, ''),
        isCMD: boolean = (message.content.startsWith(MessageConfig.Prefix) && client.commands.has(cmd!));
    if (isCMD && !message.author.bot) client.commands.get(cmd!)?.run(message, args);
}