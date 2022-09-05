const { Fields, Links } = require('./config.json');
const { Language, MessageConfig } = require('../../../config/bot.json');
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
        client.commands.forEach(cmd => 
            {
                if(!categories.includes(cmd.class.category)) categories.push(cmd.class.category)
            });
        categories.forEach(category => 
            {
                value += `\n**- Categoría de *${category}* **`
                client.commands.forEach(command =>
                    {
                        if(command.class.category === category) value += `\n**!${command.class.name}** - ${command.class.description} | \`${command.class.permissions}\``
                    })
            })
        return {
            name: Fields.Commands,
            value: value
        }
    },
    commandHelp: command =>
    {
        const aliasFormater = new Intl.ListFormat(Language);
        const valueInfo = `**Comando:** *${MessageConfig.Prefix}${command.class.name}*
        **Alias:** *${aliasFormater.format(command.class.aliases.map(a => MessageConfig.Prefix+a))}*
        **Descripción:** *${command.class.description}*
        **Parámetros:** \`${command.class.usage}\`
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