import {
    Colors,
    EmbedBuilder,
    GuildBasedChannel,
    Message,
    TextChannel
} from 'discord.js';
import Servers from '../../config/servers.json';

export async function DeleteMessage(message: Message<boolean>): Promise<void> {
    if (!Servers.hasOwnProperty(message.guildId!)) return;
    const
        logChannelID: string = Servers[message.guildId!].channels.logs.messages,
        logChannel: GuildBasedChannel = message.guild?.channels.cache.get(logChannelID)! as TextChannel,
        user: string = `${message.author?.username}#${message.author?.discriminator}`,
        avatar: string = message.author?.avatarURL()!,
        content: string = message.content || "Se ha borrado un mensaje embebido.",
        embedReply: EmbedBuilder = new EmbedBuilder()
            .setColor(Colors.Red)
            .addFields([{ name: `Mensaje borrado`, value: content }])
            .setFooter({ iconURL: avatar, text: user })
    if (message.embeds.length >= 1) {
        logChannel.send({ embeds: [embedReply, message.embeds[0]] });
        return;
    } else if (message.embeds.length === 0 && content === "Se ha borrado un mensaje embebido.")
    { 
        return;
    }
    logChannel.send({ embeds: [embedReply] });
}