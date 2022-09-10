module.exports =
{
    createChannel: (message, name, parent, type) =>
    {
        message.guild.channels.create(
            {
                name: name,
                parent: parent,
                type: type,
            })
    },
    getChannelType: (typeIndex) =>
    {
        const types = 
        [
            'Canal de texto',
            'Mensaje directo',
            'Canal de voz',
            'Chat grupal',
            'Categoría',
            'Anuncios',
            '','','','',
            'Hilo de anuncio',
            'Hilo público',
            'Hilo privado',
            'Auditorio',
            'Server HUB',
            'Foro'
        ];
        return types[typeIndex];
    }
}