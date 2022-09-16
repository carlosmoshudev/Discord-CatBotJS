import { Client, Message } from 'discord.js';
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
                helpText: "No responde a parámetros. (ej. !ping)",
            });
    }
    async run(message: Message, args: string[]): Promise<void> {
        const APIlatency: number = message.client.ws.ping;
        const MessageLatency: number = Date.now() - message.createdTimestamp;
        message.reply(`Pong!  :ping_pong: 
Latencia de mensajes: ${MessageLatency}ms
Latencia de la API: ${APIlatency}ms`);
    }
};
