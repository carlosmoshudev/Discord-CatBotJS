import {
    Channel,
    ChatInputApplicationCommandData,
    Client,
    GuildMember,
    Interaction,
    Message,
    SlashCommandStringOption,
    TextChannel,
    User
} from "discord.js";

export type NameValue = { name: string, value: string };
export type Color = { yellow: string, cyan: string, purple: string };
export type CommandAndAlias = {
    commands: Collection<string, Command>,
    aliases: Collection<string, Command>
};
export type CreateChannelData = {
    message: (Message | Interaction),
    name: string,
    parent: CategoryChannelResolvable,
    type: number
}
export type ServerChannels = {
    logs: logChannels,
    post: postChannels,
    support: supportChannels,
    serverstats: serverStatChannels,
    share: shareChannels
}
export interface logChannels {
    welcome: string;
    ban: string;
    roles: string;
    messages: string;
    server: string;
}
export interface postChannels {
    rules: string;
    welcome: string;
    twitchlive: string;
    twitter: string;
    levels: string;
}
export interface supportChannels {
    suggestions: string;
    acceptedsuggestions: string;
    tickets: string;
    solvedtickets: string;
}
export interface serverStatChannels {
    usersjoined: string
}
export interface shareChannels {
    introduce: string,
    autoroles: string
}
export interface Parameter {
    name: string,
    description: string,
    required: boolean,
    options?: { name: string, value: string }[],
    type: 'string' | 'number' | 'bool' | 'user' | 'channel' | 'role' | 'category',
}
export type CommandSender = Message | Interaction