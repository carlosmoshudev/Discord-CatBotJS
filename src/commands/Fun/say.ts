import { Command } from '../../models/Command';
import { CheckUserPermissions } from '../../utils/User';
import { Client, GuildMember, Message, Channel } from 'discord.js';
export class ConcreteCommand extends Command {
    constructor(client) {
        super(
            client,
            {
                name: 'say',
                aliases: ['decir', 'escribe', 'write'],
                description: 'El bot escribe lo que le pidas.',
                category: 'Fun',
                usage: '<texto>',
                helpText: '(ej. !say Hola amigos, soy un bot! ^^)'
            })
    }
    async run(message, args) {
        if (args) message.channel.send(args.join(' '));
        message.delete();
    }
}