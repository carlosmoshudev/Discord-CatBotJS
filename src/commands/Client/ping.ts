import {
    Client,
    Message
} from 'discord.js';
import { Command } from '../../models/Command';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: "ping",
                aliases:
                    [
                        "delay",
                        "latencia",
                        "ms"
                    ],
                description: "Comprueba la latencia con el bot.",
                category: "Client",
                usage: "N/A",
                helpText: "No responde a parámetros. (ej. !ping | !delay | !latencia)",
            });
    }
    async run(message: Message, _args: Array<string>): Promise<void> {
        const
            APIlatency: number = message.client.ws.ping,
            MessageLatency: number = Date.now() - message.createdTimestamp;
        message.reply(`Pong!  :ping_pong: 
Latencia de mensajes: ${MessageLatency}ms
Latencia de la API: ${APIlatency}ms`);
    }
};
