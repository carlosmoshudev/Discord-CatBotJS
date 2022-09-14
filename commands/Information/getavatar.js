const Command = require("../../models/command");
const { EmbedBuilder } = require('discord.js');
const { EmbedDecorator } = require('../../config/decorator.json');
module.exports = class GetAvatar extends Command {
    constructor(client) {
        super(
            client,
            {
                name: 'getavatar',
                aliases: ['avatar', 'profilepic', 'getuserpic'],
                description: 'Obtiene la foto de perfil.',
                category: 'Information',
                usage: '<member?> {default:user}',
                helpText: ''
            })
    }
    async run(message, args) {
        const
            user = message.author,
            channel = message.channel,
            mention = message.mentions.users.first() ||
                await message.guild.members.fetch(args[0]),
            embedReply = new EmbedBuilder()
                .setColor(EmbedDecorator.color)
        if (!mention) {
            embedReply
                .setTitle(`${user.username}#${user.discriminator}`)
                .setURL(`https://discordapp.com/users/${user.id}`)
                .setImage(`${user.avatarURL({ size: 1024 })}`)
                .setDescription(`[Ver imagen completa](${user.avatarURL({ size: 4096 })})`)
        }
        else if (mention.avatarURL() === null) {
            channel.send(`El usuario (${mention.username}) no tiene avatar!`);
            return;
        }
        else {
            embedReply
                .setTitle(`${mention.username}#${mention.discriminator}`)
                .setURL(`https://discordapp.com/users/${mention.id}`)
                .setThumbnail(`${user.avatarURL()}`)
                .setImage(`${mention.avatarURL({ size: 1024 })}`)
                .setFooter({ text: `A petición de ${user.username}`, iconURL: `${user.avatarURL()}` })
                .setDescription(`[Ver la imagen completa](${mention.avatarURL({ size: 4096 })})`);
        }
        channel.send({ embeds: [embedReply] });
    }
}