import { Fields, Links } from './config.json';
const { Prefix } = require('../../../config/bot.json').MessageConfig;
import { FormatToList } from '../../../utils/Formatter';
import { Client } from 'discord.js';
import { Command } from '../../../models/Command';

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
export function pushCategories(client: Client) {
    const
        categories: string[] = [],
        commands = client.commands;
    commands.forEach(command => {
        if (!categories.includes(command.category))
            categories.push(command.category)
    });
    return {
        name: '» Categorías de comandos',
        value: categories.join(' \n ')
    }
}
export function commandHelp(command: Command) {
    const
        valueInfo =
            `**Comando:**       *${Prefix}${command.name}*
        **Alias:**          *${FormatToList(command.aliases.map(alias => Prefix + alias))}*
        **Descripción:**    *${command.description}*
        **Parámetros:**  \n\`${command.usage}\`
        **Permisos:**      \`${command.permissions}\`
        **Categoría:**      *${command.category}*\n`,
        fields =
            [
                { name: Fields.CommandInfo, value: valueInfo },
                { name: Fields.CommandHelp, value: command.helptext }
            ];
    return fields;
}