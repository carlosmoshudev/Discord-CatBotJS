import {
    CategoryChannelResolvable,
    Message
} from "discord.js";

export function Create(
    message: Message,
    name: string,
    parent: CategoryChannelResolvable,
    type: number
): void {
    message.guild?.channels.create(
        {
            name: name,
            parent: parent,
            type: type,
        })
}
export function GetType(typeIndex: number): string {
    const types: string[] =
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
