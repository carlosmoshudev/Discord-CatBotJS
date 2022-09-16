import { Command } from "../../models/command";
module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            aliases: ["delay", "latencia", "ms"],
            description: "Comprueba la latencia con el bot.",
            category: "Client",
            usage: "N/A",
            helpText: "No responde a parámetros. (ej. !ping)",
        });
    }
    async run(message, args) {
        const APIlatency = message.client.ws.ping;
        const MessageLatency = Date.now() - message.createdTimestamp;
        message.reply(`Pong!  :ping_pong: 
Latencia de mensajes: ${MessageLatency}ms
Latencia de la API: ${APIlatency}ms`);
    }
};
