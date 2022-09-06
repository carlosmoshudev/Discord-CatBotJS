const Command               = require("../../models/command");
const { EmbedBuilder }      = require('discord.js');
const { EmbedDecorator }    = require('../../config/decorator.json');
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
        channel         = message.channel,
        creationTime    = channel.createdAt, 
        Date            = creationTime.getUTCDate(),
        Month           = creationTime.getUTCMonth(),
        Year            = creationTime.getUTCFullYear();
        const creation  = `${Date}/${Month}/${Year}`

        const channelConfig =
        [
            `**ID:**            ${channel.id}\n`,
            `**Creado:**        ${creation}\n`,
            `**Ratio:**         ${channel.bitrate}\n`,
            `**Descripción:**   ${channel.topic}\n`,
            `**NSFW:**          ${channel.nsfw}\n`,
            `**Categoría:**     ${channel.parent}\n`,
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
            channel.send({ embeds: [embed] });
    }
}