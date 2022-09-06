const { Fields, Links } = require('./config.json');
const { MessageConfig } = require('../../../config/bot.json');
const { List }          = require('../../../utils/Formatter');

module.exports =
{
    pushLinks: () =>
    {
        return {
            name: Fields.Links, 
            value: `[${Links.Invite.text}](${Links.Invite.url})` 
        }
    },
    pushCommands: (client, category) =>
    {
        let value = '';
        value += `\n**- Categoría de *${category}* **`
        client.commands.forEach(command =>
            {
                console.log(command.class.category)
                console.log(category)
                if(command.class.category.toLowerCase() === category.toLowerCase()) 
                    value += `\n**!${command.class.name}** - ${command.class.description} | \`${command.class.permissions}\``
            });
        return value;
    },
    pushCategories: client => 
    {
        const categories = [];
        client.commands.forEach(cmd => 
            {
                if(!categories.includes(cmd.class.category)) categories.push(cmd.class.category)
            });
        return {
            name: '» Categorías de comandos',
            value: categories.join(' \n ')
        }
    },
    commandHelp: command =>
    {
        const valueInfo = `**Comando:** *${MessageConfig.Prefix}${command.class.name}*
        **Alias:** *${List(command.class.aliases.map(a => MessageConfig.Prefix+a))}*
        **Descripción:** *${command.class.description}*
        **Parámetros:** \n\`${command.class.usage}\`
        **Permisos:** \`${command.class.permissions}\`
        **Categoría:** *${command.class.category}*\n`;
        const fields = 
        [
            { name: Fields.CommandInfo, value: valueInfo },
            { name: Fields.CommandHelp, value: command.class.helpText}
        ];

        return fields;
    }
}