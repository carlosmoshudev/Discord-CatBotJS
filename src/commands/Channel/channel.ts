import {
    CategoryChannelResolvable,
    ChatInputCommandInteraction,
    Client,
    GuildMember,
    Interaction,
    TextChannel
} from 'discord.js';
import { CheckUserPermissions } from '../../utils/User';
import { Command } from '../../models/Command';
import { CreateChannel } from './subcommands/create';
import { GetChannelInfo } from './subcommands/info';
import { ClearMessages } from './subcommands/clear';
import { SetChannelTopic } from './subcommands/topic';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'channel',
                description: 'Gestion sobre los canales.',
                category: 'Channel',
                usage: '/channel [<acción>] [args]',
                subcommands: [
                    {
                        name: 'info',
                        description: 'Obtener la información sobre un canal de texto. | [canal?]',
                        parameters: [
                            {
                                name: 'canal',
                                description: 'Selecciona un canal de texto.',
                                required: false,
                                type: 'channel'
                            }
                        ]
                    },
                    {
                        name: 'create',
                        description: 'Crear uno o varios canales en una categoría. | [categoría] [nombre] [número?]',
                        parameters: [
                            {
                                name: 'categoría',
                                description: 'La categoría sobre la que crear canales.',
                                required: true,
                                type: 'category'
                            },
                            {
                                name: 'nombre',
                                description: 'El nombre para el nuevo canal.',
                                required: true,
                                type: 'string'
                            },
                            {
                                name: 'número',
                                description: 'Número de canales a crear.',
                                required: false,
                                type: 'number'
                            }
                        ]
                    },
                    {
                        name: 'delete',
                        description: 'Eliminar un canal o una categoría entera. | [canal?] [categoría?]',
                        parameters: [
                            {
                                name: 'canal',
                                description: 'Selecciona un canal a eliminar.',
                                required: false,
                                type: 'channel'
                            },
                            {
                                name: 'categoría',
                                description: 'Selecciona la categoría a eliminar (se borran sus canales).',
                                required: false,
                                type: 'category'
                            }
                        ]
                    },
                    {
                        name: 'clear',
                        description: 'Borrar mensajes de un canal de texto. | [canal?] [número?]',
                        parameters: [
                            {
                                name: 'canal',
                                description: 'Selecciona un canal que limpiar.',
                                required: false,
                                type: 'channel'
                            },
                            {
                                name: 'número',
                                description: 'Número de mensajes a borrar.',
                                required: false,
                                type: 'number'
                            }
                        ]
                    },
                    {
                        name: 'topic',
                        description: 'Establece la descripción de un canal de texto. | [canal?] [descripción]',
                        parameters: [
                            {
                                name: 'descripción',
                                description: 'La nueva descripción para el canal.',
                                required: true,
                                type: 'string'
                            },
                            {
                                name: 'canal',
                                description: 'Selecciona el canal a describir.',
                                required: false,
                                type: 'channel'
                            }
                        ]
                    }
                ],
                permissions: 'ManageChannels, ManageMessages',
                helpText: '(ej. /createtextchannel 1000000000000000000 Juegos 3)',
                output: 'Gestionando canales'
            })
    }
    async run(slash: Interaction): Promise<void> {
        const command: ChatInputCommandInteraction = slash as ChatInputCommandInteraction;
        const subcommand: string = command.options.getSubcommand();
        const channel: TextChannel = command.options.getChannel('canal') as TextChannel
            || command.channel as TextChannel;
        const category: CategoryChannelResolvable = command.options.getChannel('categoría') as CategoryChannelResolvable;
        const name: string = command.options.getString('nombre')!;
        const number: number = command.options.getInteger('número')!;
        const topic: string = command.options.getString('descripción')!;

        switch (subcommand) {
            case 'info':
                GetChannelInfo(command, channel);
                break;
            case 'create':
                if (!CheckUserPermissions(command.member as GuildMember, 'ManageChannels')) return;
                CreateChannel(command, category, name, number || 0);
                break;
            case 'delete':
                break;
            case 'clear':
                if (!CheckUserPermissions(command.member as GuildMember, 'ManageMessages')) return;
                ClearMessages(channel, number || 100);
                break;
            case 'topic':
                if (!CheckUserPermissions(command.member as GuildMember, 'ManageChannels')) return;
                SetChannelTopic(command, channel, topic);
                break;
            default:
                break;
        }
    }
}