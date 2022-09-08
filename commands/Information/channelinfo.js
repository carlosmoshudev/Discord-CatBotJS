const Command               = require("../../models/command");
const { EmbedBuilder }      = require('discord.js');
const { EmbedDecorator }    = require('../../config/decorator.json');
const { getChannelType }    = require('../../utils/Channels');
module.exports              = class ChannelInfo extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'channelinfo',
                aliases:        ['infocanal','getchannel'],
                description:    'Información del canal.',
                category:       'Information',
                usage:          '<canal?> (#ChannelId) {default:current}',
                helpText:       'bla bla'
            })
    }
    async run(message, args)
    {
        const 
        client          = message.client,
        channel         = args[0] ? client.channels.cache.get(args[0]) : message.channel,
        creationTime    = channel.createdAt, 
        Date            = creationTime.getUTCDate(),
        Month           = creationTime.getUTCMonth(),
        Year            = creationTime.getUTCFullYear();
        const creation  = `${Date}/${Month}/${Year}`

        const channelConfig =
        [
            `**ID:**            ${channel.id}\n`,
            `**Creado:**        ${creation}\n`,
            `**Ratio:**         ${channel.bitrate || "no configurado"}\n`,
            `**Descripción:**   ${channel.topic || "no establecida"}\n`,
            `**Type:**          ${getChannelType(channel.type)}\n`,
            `**NSFW:**          ${this.getNSFW(channel)}\n`,
            `**Categoría:**     ${channel.parent}\n`,
            `**ID Categoría:**  ${channel.parentId}\n`,
            `**Mención:**       ${channel}\n`,
        ];
        const embed = new EmbedBuilder()
            .setTitle(`Información sobre canal: ${channel.name}`)
            .setURL(channel.url)
            .addFields([
                {
                    name: 'Configuración del canal',
                    value: channelConfig.join(''),
                    inline: true
                }])
            .setColor(EmbedDecorator.color)
            .setTimestamp()
            .setFooter(
                {
                    text: `Solicitado por ${message.author.username}`, 
                    iconURL: message.author.avatarURL()
                }
            );
            message.channel.send({ embeds: [embed] });
    }
    getNSFW = (channel) => channel.nsfw === false ? 'Todos los públicos' : 'Contenido explícito (+18)'
}