import {
    ChatInputCommandInteraction,
    Client,
    Interaction,
    TextChannel
} from 'discord.js';
import { CheckUserPermissions } from '../../utils/User';
import { Command } from '../../models/Command';
import { CreateChannel } from './channel/create';
import { GetChannelInfo } from './channel/getinfo';
import { ClearMessages } from './channel/clear';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'channel',
                description: 'Gestion sobre los canales.',
                category: 'Server',
                usage: '/channel [<acción>] [args]',
                subcommands: ['getinfo', 'clear', 'create', 'delete'],
                parameters: [
                    {
                        name: 'acción',
                        description: 'Lo que quieres realizar con el canal',
                        required: true,
                        type: 'string',
                        options: [
                            { name: 'Obtener la información sobre un canal de texto. | [canal?]', value: 'getinfo' },
                            { name: 'Borrar mensajes de un canal de texto. | [canal?] [número?]', value: 'clear' },
                            { name: 'Crear uno o varios canales en una categoría. | [categoría] [nombre] [número?]', value: 'create' },
                            { name: 'Eliminar un canal o toda una categoría. | [canal?] [categoría?]', value: 'delete' }
                        ]
                    },
                    {
                        name: 'categoría',
                        description: 'La categoría sobre la que crear canales.',
                        required: false,
                        type: 'category'
                    },
                    {
                        name: 'nombre',
                        description: 'Nombre que le daremos al nuevo canal.',
                        required: false,
                        type: 'string',
                    },
                    {
                        name: 'número',
                        description: 'Número de canales a crear.',
                        required: false,
                        type: 'number'
                    },
                    {
                        name: 'canal',
                        description: 'Selecciona un canal de texto.',
                        required: false,
                        type: 'channel'
                    }
                ],
                permissions: 'ManageChannels, ManageMessages',
                helpText: '(ej. /createtextchannel 1000000000000000000 Juegos 3)',
                output: 'Gestionando canales'
            })
    }
    async run(slash: Interaction): Promise<void> {
        const command: ChatInputCommandInteraction = slash as ChatInputCommandInteraction;
        switch (command.options.getString('acción')) {
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
            case 'getinfo':
                GetChannelInfo(
                    slash,
                    command.options.getChannel('canal')! as TextChannel
                    || slash.channel as TextChannel
                );
                break;
            case 'delete':
                break;
            default:
                console.log('not action retrieved');
                break;
        }
    }
}