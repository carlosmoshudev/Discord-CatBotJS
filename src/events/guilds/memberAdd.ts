import {
    ColorResolvable,
    EmbedBuilder,
    GuildBasedChannel,
    GuildMember
} from 'discord.js';
import Servers from '../../config/servers.json';
import { EmbedDecorator } from '../../config/decorator.json'
import { ServerChannels } from '../../types';
import { TextChannelOnCache } from '../../utils/Channels';

export async function MemberAdd(member: GuildMember): Promise<void> {
    if (!Servers.hasOwnProperty(member.guild.id!)) return;
    const
        currentServerChannels: ServerChannels = Servers[member.guild.id!].channels!;
    const //TODO: Refactorizar a objeto
        logChannelID: string = currentServerChannels.logs.welcome,
        welcomeChannelID: string = currentServerChannels.post.welcome,
        introduceID: string = currentServerChannels.share.introduce,
        rulesID: string = currentServerChannels.post.rules,
        autorolesID: string = currentServerChannels.share.autoroles;
    const
        logChannel: GuildBasedChannel = TextChannelOnCache(member, logChannelID),
        welcomeChannel: GuildBasedChannel = TextChannelOnCache(member, welcomeChannelID),
        introduceChannel: GuildBasedChannel = TextChannelOnCache(member, introduceID),
        rulesChannel: GuildBasedChannel = TextChannelOnCache(member, rulesID),
        autorolesChannel: GuildBasedChannel = TextChannelOnCache(member, autorolesID);
    const
        user: string = `${member.user?.username}#${member.user?.discriminator}`,
        avatar: string = member.user.avatarURL()!,
        logEmbed: EmbedBuilder = new EmbedBuilder(),
        welcomeEmbed: EmbedBuilder = new EmbedBuilder();

    welcomeEmbed
        .setTitle(`Damos la bienvenida a ${user}`)
        .setDescription(`Es un placer que te unas ${member.nickname}!`)
        .addFields(
            [
                {
                    name: `Preséntate`, value: `${introduceChannel}`, inline: true
                },
                {
                    name: `Reglas`, value: `${rulesChannel}`, inline: true
                },
                {
                    name: `Roles`, value: `${autorolesChannel}`, inline: true
                }
            ])
        .setThumbnail(avatar!)
        .setColor(EmbedDecorator.color as ColorResolvable);

    logEmbed
        .setTitle(`${user} se ha unido al servidor.`)
        .setTimestamp()
        .setThumbnail(avatar!)
        .setColor(EmbedDecorator.color as ColorResolvable);

    welcomeChannel.send({ embeds: [welcomeEmbed] });
    logChannel.send({ embeds: [logEmbed] });
}