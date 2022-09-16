import { Command } from '../../models/Command';
import { Client, Message } from 'discord.js';
export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'flipcoin',
                aliases: ['caraocruz', 'lanzarmoneda'],
                description: 'Lanza una moneda al aire.',
                category: 'Fun',
                usage: 'N/A',
                helpText: 'sin parámetros.'
            })
    }
    async run(message: Message, args: string[]) {
        const
            user = message.author,
            channel = message.channel,
            faces = ['cara', 'cruz'],
            dropChance = Math.random() * 100;
        let result;
        if (Math.round(dropChance) === 50) result = 'de canto';
        else result = faces[Math.round(dropChance / 100)];
        channel.send(`${user}, tu moneda ha salido ${result}.`)
    }
}