const { EmbedBuilder }              = require('discord.js');
const { EmbedDecorator }            = require('../../config/decorator.json');
const { pushLinks, pushCommands, commandHelp }   = require('./Miau/Fields');
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
                aliases:        ['help', 'ayuda', 'meow', 'comandos', 'commands', 'man'],
                description:    'Proporciona ayuda con los comandos.',
                category:       'Información',
                usage:          '<comando>',
                helpText:       '!miau | !miau + comando (ej. !miau ping, !miau getavatar)'
            })
    }
    async run(message, args)
    {
        const title = `Miauyuda para ${message.author.username}#${message.author.discriminator}`;
        const reply = new EmbedBuilder()
            .setColor(EmbedDecorator.color)
            .setTimestamp()
            .setThumbnail(message.author.avatarURL())
            .setFooter(
                {
                    text: `${Project.name}  v${Project.version}    |     by ${Project.author}`,
                    iconURL: EmbedDecorator.icon
                });
        if(!args[0]) 
        {
            reply
                .setTitle(title);

            const fields = [];
            fields.push(pushLinks());
            fields.push(pushCommands(message.client));
            reply.addFields(fields);
        }
        if(message.client.commands.map(cmd => cmd.command).includes(args[0])) 
        {
            const cmdHelpInfo = message.client.commands.filter(c => c.command === args[0])[0];
            reply
                .setTitle(`${title} sobre ${cmdHelpInfo.command}`)
                .addFields(commandHelp(cmdHelpInfo));
        }
        else 
        {
            reply
                .setTitle('Ayuda no encontrada')
                .setDescription(`${args[0]} no se reconoce como comando o categoría.`);
        }
        message.channel.send({embeds: [reply]});
    }
}