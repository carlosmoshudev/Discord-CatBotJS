import { Message, Client } from 'discord.js';
import { MessageConfig } from '../../config/bot.json';

export async function CreateMessage(message: Message<boolean>): Promise<void> {
    const
        client: Client = message.client,
        args: string[] = message.content.split(/\s+/),
        cmd: string | undefined = args.shift()?.toLowerCase().replace(MessageConfig.Prefix, ''),
        prefix: boolean = (message.content.startsWith(MessageConfig.Prefix)),
        isCommand = (client.commands.has(cmd!)),
        isAlias = (client.aliases.has(cmd!));
    if (prefix && !message.author.bot && isCommand) client.commands.get(cmd!)?.run(message, args);
    else if (prefix && !message.author.bot && isAlias) client.aliases.get(cmd!)?.run(message, args);
}