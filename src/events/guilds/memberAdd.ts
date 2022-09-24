import {
    EmbedBuilder,
    GuildBasedChannel,
    GuildMember,
    TextChannel
} from 'discord.js';
import Servers from '../../config/servers.json';

export async function MemberAdd(member: GuildMember): Promise<void> {
    if (!Servers.hasOwnProperty(member.guild.id!)) return;
    const
        logChannelID: string = Servers[member.guild.id!].channels.logs.welcome,
        logChannel: GuildBasedChannel = member.guild?.channels.cache.get(logChannelID)! as TextChannel,
        user: string = `${member.user?.username}#${member.user?.discriminator}`,
        avatar: string = member.avatarURL()!,
        embedReply: EmbedBuilder = new EmbedBuilder().setTitle('Demos la bienvenida a nosequien!')
    console.log(logChannel, user, avatar, embedReply);
}