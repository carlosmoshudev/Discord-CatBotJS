const { EmbedBuilder }              = require('discord.js');
const { EmbedDecorator }            = require('../../config/decorator.json');
const { pushLinks, pushCommands }   = require('./Miau/Fields');
const Command                       = require("../../models/command");
const Project                       = require('../../package.json');

module.exports = class Miau extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'miau',
                aliases:        ['help', 'ayuda'],
                description:    'Proporciona ayuda con los comandos.',
                category:       'Ayuda'
            })
    }
    async run(message)
    {
        const reply = new EmbedBuilder()
            .setTitle(`Miauyuda para ${message.author.username}#${message.author.discriminator}`)
            .setColor(EmbedDecorator.color)
            .setTimestamp()
            .setThumbnail(message.author.avatarURL())
            .setFooter(
                {
                    text: `${Project.name}  v${Project.version}    |     by ${Project.author}`,
                    iconURL: EmbedDecorator.icon
                });
        const fields = [];
        fields.push(pushLinks());
        fields.push(pushCommands(message));
        reply.addFields(fields);
        message.channel.send({embeds: [reply]});
    }
}