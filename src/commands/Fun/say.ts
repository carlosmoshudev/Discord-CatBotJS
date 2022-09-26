import { Client } from 'discord.js';
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
                helpText: '(ej. !say Hola amigos, soy un bot! ^^)'
            })
    }
    async run(sender: CommandSender, args: Array<string>): Promise<void> {
        if (args) sender.channel?.send(args.join(' '));
    }
}