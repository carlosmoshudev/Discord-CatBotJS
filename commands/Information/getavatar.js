const Command               = require("../../models/command");
const { EmbedBuilder }      = require('discord.js');
const { EmbedDecorator }    = require('../../config/decorator.json');
module.exports              = class GetAvatar extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'getavatar',
                aliases:        ['avatar','profilepic','getuserpic'],
                description:    'Obtiene la foto de perfil.',
                category:       'Information',
                usage:          '<member?> {default:user}',
                helpText:       ''
            })
    }
    async run(message, args)
    {
        let mentionUser = message.mentions.users.first()
        if (!mentionUser) 
        {
            const embed = new EmbedBuilder()
                .setTitle(`${message.author.username}#${message.author.discriminator}`)
                .setURL(`https://discordapp.com/users/${message.author.id}`)
                .setImage(`${message.author.avatarURL({size: 1024})}`)
                .setColor(EmbedDecorator.color)
                .setDescription(`[Ver imagen completa](${message.author.avatarURL({size: 4096})})`)
                
            message.channel.send({ embeds: [embed] });
        } 
        else if (mentionUser.avatarURL() === null) 
        {
            message.channel.send(`El usuario (${mentionUser.username}) no tiene avatar!`);
        } 
        else 
        {
            const embed = new EmbedBuilder()
                .setTitle(`${mentionUser.username}#${mentionUser.discriminator}`)
                .setURL(`https://discordapp.com/users/${mentionUser.id}`)
                .setThumbnail(`${message.author.avatarURL()}`)
                .setImage(`${mentionUser.avatarURL({size: 1024})}`)
                .setColor(EmbedDecorator.color)
                .setFooter({text:`A petición de ${message.author.username}`, iconURL: `${message.author.avatarURL()}`})
                .setDescription(`${message.author.username} quiere ver tu foto :face_with_hand_over_mouth: ${mentionUser}
                [Ver la imagen completa](${mentionUser.avatarURL({size: 4096})})`)
            message.channel.send({ embeds: [embed] });
        };
    }
}