import { Client } from 'discord.js';
import { Command } from '../../models/Command';
import { CommandSender } from '../../types';

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
                helpText: 'sin parámetros. (ej. !flipcoin | !caraocruz)'
            })
    }
    async run(sender: CommandSender, _args: string[]): Promise<void> {
        const
            faces: Array<string> = ['cara', 'cruz'],
            dropChance: number = Math.random() * 100;
        let result: string;
        if (Math.round(dropChance) === 50) result = 'de canto';
        else result = faces[Math.round(dropChance / 100)];
        sender.channel?.send(`${sender.member?.user}, tu moneda ha salido ${result}.`)
    }
}