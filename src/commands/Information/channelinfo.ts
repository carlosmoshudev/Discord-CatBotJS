import {
    Client,
    ColorResolvable,
    EmbedBuilder,
    Message,
    User
} from 'discord.js';
import { EmbedDecorator } from '../../config/decorator.json';
import { GetType } from '../../utils/Channels';
import { FromatToDatetime } from '../../utils/Formatter';
import { Command } from '../../models/Command';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'channelinfo',
                aliases:
                    [
                        'infocanal',
                        'getchannel'
                    ],
                description: 'Información del canal.',
                category: 'Information',
                usage: '<canal?> (#ChannelId) {default:current}',
                helpText: '(ej. !channelinfo | !channelinfo 1013602284489412700)'
            })
    }
    async run(message: Message<boolean>, _args: string[]) {
        const
            user: User = message.author,
            avatar: string | null = user.avatarURL(),
            channel: any = message.channel,
            creation: string = FromatToDatetime(channel.createdAt!),
            channelConfig: string[] =
                [
                    `**ID:**            ${channel?.id}\n`,
                    `**Creado:**        ${creation}\n`,
                    `**Descripción:**   ${channel?.topic || "no establecida"}\n`,
                    `**Type:**          ${GetType(channel?.type)}\n`,
                    `**NSFW:**          ${this.getNSFW(channel)}\n`,
                    `**Categoría:**     ${channel?.parent}\n`,
                    `**ID Categoría:**  ${channel?.parentId}\n`,
                    `**Mención:**       ${channel}\n`,
                ],
            embedReply = new EmbedBuilder()
                .setTitle(`Información sobre canal: ${channel.name}`)
                .setURL(channel.url)
                .addFields([
                    {
                        name: 'Configuración del canal',
                        value: channelConfig.join(''),
                        inline: true
                    }])
                .setColor(EmbedDecorator.color as ColorResolvable)
                .setTimestamp()
                .setFooter(
                    {
                        text: `Solicitado por ${user.username}`,
                        iconURL: avatar!
                    }
                );
        message.channel.send({ embeds: [embedReply] });
    }
    getNSFW = (channel: any) => channel.nsfw === false ? 'Todos los públicos' : 'Contenido explícito (+18)'
}