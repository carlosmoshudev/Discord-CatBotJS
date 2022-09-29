import {
    Client,
    Interaction
} from 'discord.js';
import { Command } from '../../models/Command';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'ping',
                description: 'Comprueba la latencia con el bot.',
                category: 'Bot',
                usage: '/ping [N/A]',
                helpText: 'No responde a parámetros. (ej. /ping)',
                output: 'Pong!'
            });
    }
    async run(slash: Interaction): Promise<void> {
        const APIlatency: number = slash.client?.ws.ping!;
        const MessageLatency: number = Date.now() - slash!.createdTimestamp;
        slash.channel?.send(`Pong!  :ping_pong: \nLatencia de mensajes: ${MessageLatency}ms\nLatencia de la API: ${APIlatency}ms`);
    }
};
