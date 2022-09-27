import { ChatInputCommandInteraction, Client } from 'discord.js';
import { Command } from '../../models/Command';
import { CommandSender } from '../../types';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'say',
                aliases:
                    [
                        'decir',
                        'escribe',
                        'write'
                    ],
                description: 'El bot escribe lo que le pidas.',
                category: 'Fun',
                usage: '<texto>',
                parameters: [
                    {
                        name: 'texto',
                        description: 'Lo que dirá el bot.',
                        required: true,
                        type: 'string'
                    }
                ],
                helpText: '(ej. /say Hola amigos, soy un bot! ^^)',
                output: 'shhhh, quizá nadie sepa que has sido tú.'
            })
    }
    async run(sender: CommandSender, args: Array<string>): Promise<void> {
        const
            slash: ChatInputCommandInteraction =
                sender as ChatInputCommandInteraction,
            text: string =
                slash.options.getString('texto')
                    || args ? args.join(' ')
                    : "Amigo, este comando requiere parámetros ^^";
        sender.channel?.send(text);
    }
}