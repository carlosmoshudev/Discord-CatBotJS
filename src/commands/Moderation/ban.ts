import {
    BanOptions,
    ChatInputCommandInteraction,
    Client,
    Interaction
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
                helpText: '(ej. /ban @usuario 1.)',
                output: 'miembro baneado'
            })
    }
    async run(sender: Interaction): Promise<void> {
        const
            slash: ChatInputCommandInteraction =
                sender as ChatInputCommandInteraction,
            banUser: any =
                await sender.guild?.members.fetch(slash.options.getUser('usuario')!)
                    .catch((error: Error) => { console.log(error); return; }),
            banTime: number =
                slash.options.getInteger('días')
                || 360;
        if (banUser) await banUser.ban({ days: banTime } as BanOptions);
    }
}