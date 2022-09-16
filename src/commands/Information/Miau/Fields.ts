import { Client, RestOrArray, APIEmbedField } from 'discord.js';
import { Fields, Links } from './config.json';
import { MessageConfig } from '../../../config/bot.json';
import { FormatToList } from '../../../utils/Formatter';
import { Command } from '../../../models/Command';

type NameValue = { name: string, value: string };

export function pushLinks(): NameValue {
    const links: string[] =
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
export function pushCommands(client: Client, category: string): string {
    let value = '';
    value += `\n**- Categoría de *${category}* **`
    client.commands.forEach(command => {
        if (command.category.toLowerCase() === category.toLowerCase())
            value += `\n**!${command.name}** - ${command.description} | \`${command.permissions}\``
    });
    return value;
}
export function pushCategories(client: Client): NameValue {
    const
        categories: string[] = [];
    client.commands.forEach(command => {
        if (!categories.includes(command.category))
            categories.push(command.category)
    });
    return {
        name: '» Categorías de comandos',
        value: categories.join(' \n ')
    }
}
export function commandHelp(command: Command): NameValue[] {
    const
        valueInfo =
            `**Comando:**       *${MessageConfig.Prefix}${command.name}*
**Alias:**          *${FormatToList(command.aliases.map(alias => MessageConfig.Prefix + alias))}*
**Descripción:**    *${command.description}*
**Parámetros:**  \n\`${command.usage}\`
**Permisos:**      \`${command.permissions}\`
**Categoría:**      *${command.category}*\n`,
        fields: NameValue[] = [];
    fields.push({ name: Fields.CommandInfo, value: valueInfo });
    fields.push({ name: Fields.CommandHelp, value: command.helptext })

    return fields;
}