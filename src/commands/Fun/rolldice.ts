import {
    Client,
    Channel,
    User,
    TextChannel,
    ChatInputCommandInteraction,
    Interaction
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
                usage: '<caras?> {default:6}',
                parameters: [
                    {
                        name: 'caras',
                        description: 'número de caras',
                        required: false,
                        type: 'number'
                    }
                ],
                helpText: '(ej. /rolldice | /rolldice 14)',
                output: 'Has lanzado un dado, ¡buena suerte!'
            })
    }
    async run(sender: Interaction): Promise<void> {
        const
            slash: ChatInputCommandInteraction =
                sender as ChatInputCommandInteraction,
            user: User =
                sender.member?.user! as User,
            channel: Channel =
                sender.channel! as TextChannel,
            faces: number = slash.options.getInteger('caras')! || 6,
            faceResult: number =
                Math.floor(Math.random() * faces) + 1;
        channel.send(`${user}, te ha salido un ${faceResult}. :game_die:`)
    }

}