import {
    BanOptions,
    Client,
    Message
} from 'discord.js';
import { Command } from '../../models/Command';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'ban',
                aliases: ['banear'],
                description: 'Banea un usuario.',
                category: 'Moderation',
                permissions: 'BanMembers',
                usage: '<member> #mention\n<days?> (default:360)',
                helpText: '(ej. !ban @usuario 1.)'
            })
    }
    async run(message: Message, args: Array<string>): Promise<void> {
        const
            banUser = message.mentions.members?.first() ||
                await message.guild?.members.fetch(args[0])
                    .catch((error: Error) => { console.log(error); return; }),
            banTime: number = parseInt(args[1]) || 360;
        if (banUser) await banUser.ban({ days: banTime } as BanOptions);
    }
}