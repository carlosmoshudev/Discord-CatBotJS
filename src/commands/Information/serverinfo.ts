import {
    Client,
    ColorResolvable,
    EmbedBuilder,
    Guild,
    Message,
    User,
    Channel
} from 'discord.js';
import { EmbedDecorator } from '../../config/decorator.json';
import { FromatToDatetime } from '../../utils/Formatter';
import { Command } from "../../models/Command";

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'serverinfo',
                aliases:
                    [
                        'servidor',
                        'guildinfo'
                    ],
                description: 'Información del servidor.',
                category: 'Information',
                usage: '<server?> (#GuildID Joined) {default:current}',
                helpText: '(ej. !serverinfo | !serverinfo 0000000000000000)'
            })
    }
    async run(message: Message, _args: Array<string>) {
        const
            server: Guild = message.guild!,
            user: User = message.author,
            channel: Channel = message.channel,
            owner: User = message.client.users.cache.get(server!.ownerId)!,
            creation: string = FromatToDatetime(server!.createdAt),
            serverConfig: Array<string> =
                [
                    `**ID:**            ${server!.id}\n`,
                    `**Creado en:**     ${creation}\n`,
                    `**Descripción:**   ${server!.description || "sin descripción"}\n`,
                    `**Canal voz AFK:** ${server!.afkChannel || "No configurado"}\n`,
                    `**Seguridad:**     F2A ${this.getF2A(server!)}\n`,
                    `**Ver reglas:**    ${server!.rulesChannel || "sin canal de reglas"}\n`,
                    `**Propiedad:**     ${owner}\n`,
                    `**Creado:**        ${creation}\n`,
                ],
            embedReply: EmbedBuilder = new EmbedBuilder()
                .setTitle(`Información sobre servidor: ${server!.name}`)
                .addFields([
                    {
                        name: 'Configuración del servidor',
                        value: serverConfig.join(''),
                        inline: true
                    }])
                .setColor(EmbedDecorator.color as ColorResolvable)
                .setTimestamp()
                .setFooter(
                    {
                        text: `Solicitado por ${user.username}`,
                        iconURL: user.avatarURL()!
                    }
                );
        channel.send({ embeds: [embedReply] });
    }
    getF2A = (server: Guild) => server.mfaLevel === 0 ? '*Habilitado*' : '*Deshabilitado*';
}