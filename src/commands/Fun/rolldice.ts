import {
    Client,
    Channel,
    User,
    TextChannel
} from 'discord.js';
import { Command } from '../../models/Command';
import { CommandSender } from '../../types';

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
                parameters: [{ name: 'caras', description: 'número de caras', required: false }],
                helpText: '(ej. !rolldice | !rolldice 14)'
            })
    }
    async run(sender: CommandSender, args: Array<string>): Promise<void> {
        const
            user: User = sender.member?.user! as User,
            channel: Channel = sender.channel! as TextChannel,
            faces: number = parseInt(args[0]) || 6,
            face: number = Math.floor(Math.random() * faces) + 1;
        channel.send(`${user}, te ha salido un ${face}. :game_die:`)
    }

}