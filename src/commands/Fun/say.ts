import { ChatInputCommandInteraction, Client, Interaction } from 'discord.js';
import { Command } from '../../models/Command';

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
    async run(sender: Interaction): Promise<void> {
        const
            slash: ChatInputCommandInteraction =
                sender as ChatInputCommandInteraction;
        let text: string =
            slash.options.getString('texto')!;
        sender.channel?.send(text);
    }
}