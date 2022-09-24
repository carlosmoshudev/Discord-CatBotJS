import {
    Client,
    Message,
    Channel,
    User
} from 'discord.js';
import { Command } from '../../models/Command';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'rolldice',
                aliases: ['lanzardado'],
                description: 'Lanza un dado de n caras.',
                category: 'Fun',
                usage: '<faces?> {default:6}',
                helpText: '(ej. !rolldice | !rolldice 14)'
            })
    }
    async run(message: Message, args: Array<string>): Promise<void> {
        const
            user: User = message.author,
            channel: Channel = message.channel,
            faces: number = parseInt(args[0]) || 6,
            face: number = Math.floor(Math.random() * faces) + 1;
        channel.send(`${user}, te ha salido un ${face}. :game_die:`)

    }
}