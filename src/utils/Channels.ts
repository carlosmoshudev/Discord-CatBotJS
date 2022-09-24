import { GuildMember, TextChannel } from "discord.js";
import { CreateChannelData } from "../types";

export function Create(options: CreateChannelData): void {
    options.message.guild?.channels.create(
        {
            name: options.name,
            parent: options.parent,
            type: options.type,
        })
}
export function GetType(typeIndex: number): string {
    const types: Array<string> =
        [
            'Canal de texto',
            'Mensaje directo',
            'Canal de voz',
            'Chat grupal',
            'Categoría',
            'Anuncios',
            '', '', '', '',
            'Hilo de anuncio',
            'Hilo público',
            'Hilo privado',
            'Auditorio',
            'Server HUB',
            'Foro'
        ];
    return types[typeIndex];
}
export function TextChannelOnCache(member: GuildMember, channelId: string): TextChannel {
    return member.guild?.channels.cache.get(channelId!)! as TextChannel;
}