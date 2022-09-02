const { Fields, Links } = require('./config.json');
module.exports =
{
    pushLinks: () =>
    {
        return {
            name: Fields.Links, 
            value: `[${Links.Invite.text}](${Links.Invite.url})` 
        }
    },
    pushCommands: client =>
    {
        let value = '';
        const categories = [];
        client.commands.forEach(x => categories.push(x.class.category));
        categories.forEach(x => 
            {
                value += `\n**- Categoría de *${x}* **`
                client.commands.forEach(y =>
                    {
                        if(y.class.category === x) value += `\n**!${y.class.name}** - ${y.class.description} | \`${y.class.permissions}\``
                    })
            })
        console.log(categories)
        return {
            name: Fields.Commands,
            value: value
        }
    }
}