import {
    Client,
    Message
} from 'discord.js';
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
                helpText: '(ej. !say Hola amigos, soy un bot! ^^)'
            })
    }
    async run(message: Message, args: Array<string>): Promise<void> {
        if (args) message.channel.send(args.join(' '));
        message.delete();
    }
}