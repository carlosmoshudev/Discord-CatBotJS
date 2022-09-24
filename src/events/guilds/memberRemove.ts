import {
    ColorResolvable,
    EmbedBuilder,
    GuildBasedChannel,
    GuildMember
} from 'discord.js';
import Servers from '../../config/servers.json';
import { ServerChannels } from '../../types';
import { TextChannelOnCache } from '../../utils/Channels';
import { EmbedDecorator } from '../../config/decorator.json'

export async function MemberRemove(member: GuildMember): Promise<void> {
    if (!Servers.hasOwnProperty(member.guild.id!)) return;
    const
        currentServerChannels: ServerChannels = Servers[member.guild.id!].channels!,
        logChannelID: string = currentServerChannels.logs.welcome,
        logChannel: GuildBasedChannel = TextChannelOnCache(member, logChannelID),
        user: string = `${member.user?.username}#${member.user?.discriminator}`,
        avatar: string = member.user.avatarURL()!,
        logEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`${user} ha abandonado el servidor.`)
            .setTimestamp()
            .setThumbnail(avatar!)
            .setColor(EmbedDecorator.color as ColorResolvable);
    logChannel.send({ embeds: [logEmbed] });
}