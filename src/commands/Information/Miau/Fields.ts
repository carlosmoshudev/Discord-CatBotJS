import { Fields, Links } from './config.json';
const { Prefix } = require('../../../config/bot.json').MessageConfig;
import { FormatToList } from '../../../utils/Formatter';

    export function pushLinks() {
        const links =
            [
                `[${Links.Invite.text}](${Links.Invite.url})`,
                `[${Links.Repository.text}](${Links.Repository.url})`,
                `[${Links.HelpGuild.text}](${Links.HelpGuild.url})`
            ]
        return {
            name: Fields.Links,
            value: links.join(' | ')
        }
    }
    export function pushCommands(client, category) {
        const commands = client.commands;
        let value = '';
        value += `\n**- Categoría de *${category}* **`
        commands.forEach(command => {
            if (command.class.category.toLowerCase() === category.toLowerCase())
                value += `\n**!${command.class.name}** - ${command.class.description} | \`${command.class.permissions}\``
        });
        return value;
    }
    export function pushCategories(client) {
        const
            categories = [],
            commands = client.commands;
        commands.forEach(command => {
            if (!categories.includes(command.class.category))
                categories.push(command.class.category)
        });
        return {
            name: '» Categorías de comandos',
            value: categories.join(' \n ')
        }
    }
    export function commandHelp(command) {
        const
            cmd = command.class,
            valueInfo =
                `**Comando:**       *${Prefix}${cmd.name}*
        **Alias:**          *${List(cmd.aliases.map(alias => Prefix + alias))}*
        **Descripción:**    *${cmd.description}*
        **Parámetros:**  \n\`${cmd.usage}\`
        **Permisos:**      \`${cmd.permissions}\`
        **Categoría:**      *${cmd.category}*\n`,
            fields =
                [
                    { name: Fields.CommandInfo, value: valueInfo },
                    { name: Fields.CommandHelp, value: cmd.helpText }
                ];
        return fields;
    }