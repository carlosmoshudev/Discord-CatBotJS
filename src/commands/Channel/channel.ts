import {
    ChatInputCommandInteraction,
    Client,
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
        switch (command.options.getSubcommand()) {
            case 'create':
                if (!CheckUserPermissions(slash.member!, 'ManageChannels')) return;
                const contingencyCategory = slash.channel as TextChannel;
                CreateChannel(
                    slash,
                    command.options.getChannel('categoría')?.id! || contingencyCategory.parent!,
                    command.options.getString('nombre')!,
                    Number(command.options.getInteger('número')) || 0
                );
                break;
            case 'clear':
                if (!CheckUserPermissions(slash.member!, 'ManageChannels')) return;
                ClearMessages(
                    command.options.getChannel('canal')! as TextChannel
                    || slash.channel as TextChannel,
                    Number(command.options.getInteger('número')) || 100
                );
                break;
            case 'info':
                GetChannelInfo(
                    slash,
                    command.options.getChannel('canal')! as TextChannel
                    || slash.channel as TextChannel
                );
                break;
            case 'delete':
                break;
            case 'topic':
                SetChannelTopic(
                    slash,
                    command.options.getChannel('canal')! as TextChannel
                    || slash.channel as TextChannel,
                    command.options.getString('descripción')!
                );
                break;
            default:
                console.log('not action retrieved');
                break;
        }
    }
}