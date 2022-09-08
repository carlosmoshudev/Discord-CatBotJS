const { EmbedBuilder }      = require('discord.js');
const { EmbedDecorator }    = require('../../config/decorator.json');
const { Links }             = require('./Miau/config.json');
const { 
    pushLinks, 
    pushCommands, 
    pushCategories,
    commandHelp }           = require('./Miau/Fields');
const Command               = require("../../models/command");
const Project               = require('../../package.json');

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
                category:       'Information',
                usage:          '<comando?> {default:global help}',
                helpText:       '!miau | !miau + comando (ej. !miau ping, !miau getavatar)'
            })
    }
    async run(message, args)
    {
        const requested = args[0] || null;
        const title = `Miauyuda para ${message.author.username}#${message.author.discriminator}`;
        const reply = new EmbedBuilder()
            .setColor(EmbedDecorator.color)
            .setURL(Links.Invite.url)
            .setTimestamp()
            .setThumbnail(message.author.avatarURL())
            .setFooter(
                {
                    text: `${Project.name}  v${Project.version}    |     by ${Project.author}`,
                    iconURL: EmbedDecorator.icon
                });
        if(!requested) 
        {
            const linksEmbed = new EmbedBuilder();
            linksEmbed.setColor(EmbedDecorator.secondarycolor)
            .addFields(pushLinks());
            reply
                .setTitle(title)
                .setDescription('Escribe !miau + <categoría> para más ayuda.')
                .addFields(pushCategories(message.client));
            message.channel.send({embeds: [reply, linksEmbed]});
        }
        if(message.client.commands.map(cmd => cmd.command).includes(requested)) 
        {
            const cmdHelpInfo = message.client.commands.filter(c => c.command === requested)[0];
            reply
                .setTitle(`${title} sobre ${cmdHelpInfo.command}`)
                .addFields(commandHelp(cmdHelpInfo));
            message.channel.send({embeds: [reply]});
        }
        else if(message.client.categories.map(cat => cat.toLowerCase()).includes(requested))
        {
            reply
                .setTitle(title)
                .setDescription(pushCommands(message.client, requested));
                message.channel.send({embeds: [reply]});
        }
        else if (requested)
        {
            reply
                .setTitle('Ayuda no encontrada')
                .setDescription(`${requested} no se reconoce como comando o categoría.`);
            message.channel.send({embeds: [reply]});
        }
    }
}