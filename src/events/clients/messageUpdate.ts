import {
    GuildBasedChannel,
    TextChannel,
    EmbedBuilder,
    Colors,
    Message
} from 'discord.js';
import Servers from '../../config/servers.json';
export async function UpdateMessage(old: Message, message: Message) {
    if (!Servers.hasOwnProperty(message.guildId!)) return;
    const
        logChannelID: string = Servers[message.guildId!].channels.logs.messages,
        logChannel: GuildBasedChannel = message.guild?.channels.cache.get(logChannelID)! as TextChannel,
        user: string = `${message.author?.username}#${message.author?.discriminator}`,
        avatar: string = message.author?.avatarURL()!,
        embedReply: EmbedBuilder = new EmbedBuilder()
            .setColor(Colors.Red)
            .addFields([
                {
                    name: 'Mensaje anterior',
                    value: old.content
                },
                {
                    name: "Nuevo mensaje",
                    value: message.content
                }
            ])
            .setFooter({ iconURL: avatar, text: user })
    logChannel.send({ embeds: [embedReply] });
}