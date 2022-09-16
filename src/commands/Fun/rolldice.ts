import { Command } from '../../models/Command';
import { CheckUserPermissions } from '../../utils/User';
import { Client, GuildMember, Message, Channel } from 'discord.js';
export class ConcreteCommand extends Command {
    constructor(client) {
        super(
            client,
            {
                name: 'rolldice',
                aliases: ['lanzardado'],
                description: 'Lanza un dado de n caras.',
                category: 'Fun',
                usage: '<faces?> {default:6}',
                helpText: '(ej. !rolldice 14)'
            })
    }
    async run(message, args) {
        const
            user = message.author,
            channel = message.channel,
            faces = args[0] || 6,
            face = Math.floor(Math.random() * faces) + 1;
        channel.send(`${user}, te ha salido un ${face}. :game_die:`)

    }
}