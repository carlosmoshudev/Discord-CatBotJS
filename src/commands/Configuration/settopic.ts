import {
    Client,
    GuildMember
} from 'discord.js';
import { CheckUserPermissions } from '../../utils/User';
import { Command } from '../../models/Command';
import { CommandSender } from '../../types';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'settopic',
                aliases:
                    [
                        'topic',
                        'topico',
                        'tematica'
                    ],
                description: 'Actualiza la temática del canal.',
                category: 'Configuration',
                permissions: 'ManageChannels',
                usage: '<topic>',
                parameters: [
                    {
                        name: 'topic',
                        description: 'Introduce la descripción del canal',
                        required: true
                    }
                ],
                helpText: '(ej. !settopic Canal de ayuda y soporte.)'
            })
    }
    async run(sender: CommandSender, args: string[]): Promise<void> {
        if (!CheckUserPermissions(sender.member! as GuildMember, this.permissions) ||
            sender.channel?.type !== 0) return;
        sender.channel?.setTopic(args!.join(' '));
    }
}