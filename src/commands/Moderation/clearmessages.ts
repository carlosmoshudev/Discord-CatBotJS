import {
    Channel,
    Client,
    GuildMember,
    TextChannel
} from 'discord.js';
import { CheckUserPermissions } from '../../utils/User';
import { Command } from '../../models/Command';
import { CommandSender } from '../../types';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'clearmessages',
                aliases:
                    [
                        'deletemessages',
                        'clearchannel',
                        'borrarmensajes'
                    ],
                description: 'Elimina los mensajes del canal.',
                category: 'Moderation',
                usage: '<número?> {max:100, default:100}',
                parameters: [
                    {
                        name: 'número',
                        description: 'número de mensajes a eliminar',
                        required: false,
                        type: 'number'
                    }
                ],
                permissions: 'ManageMessages',
                helpText: '(ej. !clearmessages | !clearmessages 100)\n Borra los mensajes de todos los usuarios. Max 100',
                output: 'bloooom'
            })
    }
    async run(sender: CommandSender, args: Array<string>): Promise<void> {
        const
            member: GuildMember = sender.member! as GuildMember,
            channel: Channel = sender.channel as TextChannel;
        if (!CheckUserPermissions(member, this.permissions)) return;
        const
            deleteCounter: number = parseInt(args[0]) || 100;
        channel.bulkDelete(deleteCounter, true)
            .catch((error: Error) => console.log(error.stack));
    }
}