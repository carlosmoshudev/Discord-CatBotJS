import {
    Client,
    ColorResolvable,
    EmbedBuilder,
    Message,
    User
} from 'discord.js';
import { EmbedDecorator } from '../../config/decorator.json';
import { Command } from '../../models/Command';
import { CommandSender } from '../../types';

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
                usage: '<usuario?> {default:user}',
                parameters: [
                    {
                        name: 'usuario',
                        description: 'el usuario al que robarle la foto',
                        required: false,
                        type: 'user'
                    }
                ],
                helpText: '', output: 'yes'
            })
    }
    async run(sender: CommandSender, _args: Array<string>) {
        const
            m = sender as Message,
            user: User = sender.member?.user! as User,
            mention: any = _args[0]!,
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
            m.channel.send(`El usuario (${mention.username}) no tiene avatar!`);
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
        m.channel.send({ embeds: [embedReply] });
    }
}