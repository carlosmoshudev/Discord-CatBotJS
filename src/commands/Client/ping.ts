import { Client } from 'discord.js';
import { Command } from '../../models/Command';
import { CommandSender } from '../../types';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'ping',
                aliases:
                    [
                        'delay',
                        'latencia',
                        'ms'
                    ],
                description: 'Comprueba la latencia con el bot.',
                category: 'Client',
                usage: 'N/A',
                helpText: 'No responde a parámetros. (ej. /ping | !delay)',
                output: 'Pong!'
            });
    }
    async run(sender: CommandSender, _args: Array<string>): Promise<void> {
        const APIlatency: number = sender.client?.ws.ping!;
        const MessageLatency: number = Date.now() - sender!.createdTimestamp;
        sender.channel?.send(`Pong!  :ping_pong: 
        Latencia de mensajes: ${MessageLatency}ms
        Latencia de la API: ${APIlatency}ms`);
    }
};
