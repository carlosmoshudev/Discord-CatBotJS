import {
    ChatInputCommandInteraction,
    Client,
    GuildMember,
    Interaction
} from 'discord.js';
import { CheckUserPermissions } from '../../utils/User';
import { Command } from '../../models/Command';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'settopic',
                description: 'Actualiza o establece la temática del canal.',
                category: 'Configuration',
                permissions: 'ManageChannels',
                usage: '/settopic [<descripción>]',
                parameters: [
                    {
                        name: 'descripción',
                        description: 'La nueva descripción para el canal actual.',
                        required: true,
                        type: 'string'
                    }
                ],
                helpText: '(ej. /settopic Canal de ayuda y soporte.)',
                output: 'Solicitud de descripción de canal gestionada'
            })
    }
    async run(sender: Interaction): Promise<void> {
        if (!CheckUserPermissions(sender.member! as GuildMember, this.permissions)
            || sender.channel?.type !== 0) return;
        const
            slash: ChatInputCommandInteraction =
                sender as ChatInputCommandInteraction,
            topic: string =
                slash.options.getString('descripción')!;
        sender.channel?.setTopic(topic);
    }
}