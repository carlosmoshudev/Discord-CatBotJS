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
    }
}