import { Client, Interaction } from 'discord.js';
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
                helpText: 'sin parámetros. (ej. !flipcoin | !caraocruz)',
                output: 'Has lanzado una moneda al aire, ¡buena suerte!'
            })
    }
    async run(sender: Interaction): Promise<void> {
        const
            faces: Array<string> =
                ['cara', 'cruz'],
            dropChance: number =
                Math.random() * 100;
        let result: string;
        if (Math.round(dropChance) === 50)
            result = 'de canto';
        else
            result = faces[Math.round(dropChance / 100)];
        sender.channel?.send(`${sender.member?.user}, tu moneda ha salido ${result}.`)
    }
}