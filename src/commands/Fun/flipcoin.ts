import { Client, Message, User, Channel } from 'discord.js';
import { Command } from '../../models/Command';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'flipcoin',
                aliases:
                    [
                        'caraocruz',
                        'lanzarmoneda'
                    ],
                description: 'Lanza una moneda al aire.',
                category: 'Fun',
                usage: 'N/A',
                helpText: 'sin parámetros.'
            })
    }
    async run(message: Message, _: string[]): Promise<void> {
        const
            user: User = message.author,
            channel: Channel = message.channel,
            faces: string[] = ['cara', 'cruz'],
            dropChance: number = Math.random() * 100;
        let result: string;
        if (Math.round(dropChance) === 50) result = 'de canto';
        else result = faces[Math.round(dropChance / 100)];
        channel.send(`${user}, tu moneda ha salido ${result}.`)
    }
}