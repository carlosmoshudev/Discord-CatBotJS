import { Client, GuildMember, Message, Channel } from 'discord.js';
import { CheckUserPermissions } from '../../utils/User';
import { Command } from '../../models/Command';

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
                helpText: '(ej. !settopic Canal de ayuda y soporte.)'
            })
    }
    async run(message: Message, args: string[]): Promise<void> {
        const
            user: GuildMember | null = message.member,
            channel: Channel = message.channel;
        if (!CheckUserPermissions(user, this.permissions)
            || channel.type != 0) return;
        channel?.setTopic(args.join(' '));
    }
}