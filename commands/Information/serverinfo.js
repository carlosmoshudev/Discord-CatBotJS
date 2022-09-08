const Command               = require("../../models/command");
const { EmbedBuilder }      = require('discord.js');
const { EmbedDecorator }    = require('../../config/decorator.json');
module.exports              = class ServerInfo extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'serverinfo',
                aliases:        ['servidor','guildinfo'],
                description:    'Información del servidor.',
                category:       'Information',
                usage:          '<server?> (#GuildID Joined) {default:current}',
                helpText:       'bla bla'
            })
    }
    async run(message, args)
    {
        const 
        server          = message.guild,
        owner           = message.client.users.cache.get(server.ownerId),
        creationTime    = server.createdAt, 
        Date            = creationTime.getUTCDate(),
        Month           = creationTime.getUTCMonth(),
        Year            = creationTime.getUTCFullYear();
        const creation  = `${Date}/${Month}/${Year}`;
        const serverConfig =
        [
            `**ID:**            ${server.id}\n`,
            `**Creado en:**     ${creation}\n`,
            `**Descripción:**   ${server.description || "sin descripción"}\n`,
            `**Canal voz AFK:** ${server.afkChannel || "No configurado"}\n`,
            `**Seguridad:**     F2A ${this.getF2A(server)}\n`,
            `**Ver reglas:**    ${server.rulesChannel || "sin canal de reglas"}\n`,
            `**Propiedad:**     ${owner}\n`,
            `**Creado:**        ${creation}\n`,
        ];
        const embed = new EmbedBuilder()
            .setTitle(`Información sobre servidor: ${server.name}`)
            .setURL(server.url)
            .addFields([
                {
                    name: 'Configuración del servidor',
                    value: serverConfig.join(''),
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
    getF2A = (server) => server.mfaLevel === 0 ? '*Habilitado*' : '*Deshabilitado*';
}