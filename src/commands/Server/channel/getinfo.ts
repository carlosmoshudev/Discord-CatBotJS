import {
    ColorResolvable,
    EmbedBuilder,
    Interaction,
    TextChannel
} from "discord.js";
import { FromatToDatetime } from "../../../utils/Formatter";
import { EmbedDecorator } from '../../../config/decorator.json';
import { GetType } from "../../../utils/Channels";

export function GetChannelInfo(slash: Interaction, channel: TextChannel) {
    const
        creation: string =
            FromatToDatetime(channel.createdAt!),
        channelConfig: Array<string> =
            [
                `**ID:**            ${channel?.id}\n`,
                `**Creado:**        ${creation}\n`,
                `**Descripción:**   ${channel?.topic || "no establecida"}\n`,
                `**Type:**          ${GetType(channel?.type)}\n`,
                `**NSFW:**          ${GetNSFW(channel)}\n`,
                `**Categoría:**     ${channel?.parent}\n`,
                `**ID Categoría:**  ${channel?.parentId}\n`,
                `**Mención:**       ${channel}\n`,
            ],
        embedReply =
            new EmbedBuilder()
                .setTitle(`Información sobre canal: ${channel.name}`)
                .setURL(channel.url)
                .addFields([
                    {
                        name: 'Configuración del canal',
                        value: channelConfig.join(''),
                        inline: true
                    }])
                .setColor(EmbedDecorator.color as ColorResolvable)
                .setTimestamp();
    slash.channel?.send({ embeds: [embedReply] });
}
function GetNSFW(channel: TextChannel): string {
    if (channel.nsfw) {
        return 'Contenido explícito.'
    } else return 'Para todos los públicos.'
}