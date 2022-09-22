import { Channel, Client, ColorResolvable, EmbedBuilder, Message, User } from 'discord.js';
import { EmbedDecorator } from '../../config/decorator.json';
import { Command } from '../../models/Command';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'getavatar',
                aliases:
                    [
                        'avatar',
                        'profilepic',
                        'getuserpic'
                    ],
                description: 'Obtiene la foto de perfil.',
                category: 'Information',
                usage: '<member?> {default:user}',
                helpText: ''
            })
    }
    async run(message: Message, _: string[]) {
        const
            user: User = message.author,
            channel: Channel = message.channel,
            mention: User = message.mentions.users.first()!,
            embedReply: EmbedBuilder = new EmbedBuilder()
                .setColor(EmbedDecorator.color as ColorResolvable)
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