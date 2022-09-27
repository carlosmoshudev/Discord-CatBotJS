import {
    EmbedBuilder,
    Client,
    ColorResolvable,
    User,
    Channel,
    TextChannel,
    ChatInputCommandInteraction
} from 'discord.js';
import { EmbedDecorator } from '../../config/decorator.json';
import { Links } from './Miau/config.json';
import { pushLinks, pushCommands, pushCategories, commandHelp } from './Miau/Fields';
import { Command } from "../../models/Command";
import Project from '../../../package.json';
import { CommandSender } from '../../types';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'miau',
                aliases:
                    [
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
                parameters: [
                    {
                        name: 'comando',
                        description: 'Sobre que obtener ayuda',
                        required: false,
                        type: 'string'
                    },
                    {
                        name: 'categoría',
                        description: 'Sobre que obtener ayuda',
                        required: false,
                        type: 'string'
                    }
                ],
                helpText: 'Se puede añadir un comando o categoría como parámetro\n (ej. !miau ping, !miau getavatar)',
                output: 'miau'
            })
    }
    async run(sender: CommandSender, args: Array<string>) {
        const
            slash: ChatInputCommandInteraction =
                sender as ChatInputCommandInteraction,
            user: User =
                sender.member?.user as User,
            client: Client =
                sender.client,
            channel: Channel =
                sender.channel as TextChannel,
            commandOrCategory: string | null =
                slash.options.getString('comando')
                || slash.options.getString('categoría')
                || args[0]
                || null,
            embedTitle: string =
                `Miauyuda para ${user.username}#${user.discriminator}`,
            embedReply: EmbedBuilder =
                new EmbedBuilder()
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
                linksEmbed: EmbedBuilder =
                    new EmbedBuilder()
                        .setColor(EmbedDecorator.secondarycolor as ColorResolvable)
                        .addFields(pushLinks());
            embedReply
                .setTitle(embedTitle)
                .setDescription('Escribe !miau + <categoría> para más ayuda.')
                .addFields(pushCategories(sender.client));
            await channel.send({ embeds: [embedReply, linksEmbed] });
        }
        if (client.commands.map(command =>
            command.name).includes(commandOrCategory!)) {
            const cmdInfo: Command =
                client.commands.get(commandOrCategory!)!;
            embedReply
                .setTitle(`${embedTitle} sobre ${cmdInfo?.name}`)
                .addFields(commandHelp(cmdInfo!));
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