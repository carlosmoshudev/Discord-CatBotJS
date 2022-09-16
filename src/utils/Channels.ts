
export function Create(message, name, parent, type):void {
    message.guild.channels.create(
        {
            name: name,
            parent: parent,
            type: type,
        })
}
export function GetType(typeIndex) {
    const types =
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
