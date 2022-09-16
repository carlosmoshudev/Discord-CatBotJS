import { EmbedBuilder, Client, Message, ColorResolvable } from 'discord.js';
import { EmbedDecorator } from '../../config/decorator.json';
import { Links } from './Miau/config.json';
import { pushLinks, pushCommands, pushCategories } from './Miau/Fields';
import { Command } from "../../models/Command";
import Project from '../../../package.json';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'miau',
                aliases: [
                    'help',
                    'ayuda',
                    'meow',
                    'comandos',
                    'commands',
                    'man'
                ],
                description: 'Proporciona ayuda con los comandos.',
                category: 'Information',
                usage: '<comando?> {default:global help}',
                helpText: 'Se puede añadir un comando o categoría como parámetro\n (ej. !miau ping, !miau getavatar)',
            })
    }
    async run(message: Message, args: string[]) {
        const
            user = message.author,
            client = message.client,
            channel = message.channel,
            commandOrCategory = args[0] || null,
            embedTitle = `Miauyuda para ${user.username}#${user.discriminator}`,
            embedReply = new EmbedBuilder()
                .setColor(EmbedDecorator.color as ColorResolvable)
                .setURL(Links.Invite.url)
                .setTimestamp()
                .setThumbnail(user.avatarURL())
                .setFooter(
                    {
                        text: `${Project.name}  v${Project.version}    |     by ${Project.author}`,
                        iconURL: EmbedDecorator.icon
                    });
        if (!commandOrCategory) {
            const
                linksEmbed = new EmbedBuilder()
                    .setColor(EmbedDecorator.secondarycolor as ColorResolvable)
                    .addFields(pushLinks());
            embedReply
                .setTitle(embedTitle)
                .setDescription('Escribe !miau + <categoría> para más ayuda.')
                .addFields(pushCategories(message.client));
            channel.send({ embeds: [embedReply, linksEmbed] });
        }
        if (client.commands.map(command =>
            command.name).includes(commandOrCategory!)) {
            const
                commandHelpInfo = client.commands.filter(command =>
                    command.name === commandOrCategory)[0];
            embedReply
                .setTitle(`${embedTitle} sobre ${commandHelpInfo.command}`)
                .addFields(commandHelpInfo(commandHelpInfo));
            channel.send({ embeds: [embedReply] });
        }
        else if (client.categories.map(category =>
            category.toLowerCase()).includes(commandOrCategory!)) {
            embedReply
                .setTitle(embedTitle)
                .setDescription(pushCommands(client, commandOrCategory!));
            channel.send({ embeds: [embedReply] });
        }
        else if (commandOrCategory) {
            embedReply
                .setTitle('Ayuda no encontrada')
                .setDescription(`${commandOrCategory} no se reconoce como comando o categoría.`);
            channel.send({ embeds: [embedReply] });
        }
    }
}