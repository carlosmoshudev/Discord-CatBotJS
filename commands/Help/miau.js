const { EmbedBuilder }      = require('discord.js');
const { EmbedDecorator }    = require('../../config/decorator.json');
const Command               = require("../../models/command");

module.exports = class Miau extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'miau',
                description:    'Proporciona ayuda con los comandos.',
                usage:          '<información>',
                category:       'Ayuda',
                permissions:    'cualquiera'
            })
    }
    async run(message)
    {
        const reply = new EmbedBuilder()
            .setTitle(`Miauyuda para ${message.author.username}#${message.author.discriminator}`)
            .setColor(EmbedDecorator.color);
        const fields = [];

        reply.addFields(fields);
        message.channel.send({embeds: [reply]});
    }
}