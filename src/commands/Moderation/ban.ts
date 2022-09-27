import {
    BanOptions,
    Client
} from 'discord.js';
import { Command } from '../../models/Command';
import { CommandSender } from '../../types';

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
                parameters: [
                    {
                        name: 'usuario',
                        description: 'A quien banear',
                        required: true,
                        type: 'user'
                    },
                    {
                        name: 'motivo',
                        description: 'Motivo del baneo',
                        required: false,
                        type: 'string'
                    },
                    {
                        name: 'días',
                        description: 'tiempo del baneo',
                        required: false,
                        type: 'number'
                    }
                ],
                helpText: '(ej. !ban @usuario 1.)',
                output: 'miembro baneado'
            })
    }
    async run(sender: CommandSender, args: Array<string>): Promise<void> {
        const
            banUser =
                await sender.guild?.members.fetch(args[0])
                    .catch((error: Error) => { console.log(error); return; }),
            banTime: number = parseInt(args[1]) || 360;
        if (banUser) await banUser.ban({ days: banTime } as BanOptions);
    }
}