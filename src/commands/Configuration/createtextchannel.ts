import {
    CategoryChannelResolvable,
    ChatInputCommandInteraction,
    Client,
    GuildMember
} from 'discord.js';
import { CheckUserPermissions } from '../../utils/User';
import { Create } from '../../utils/Channels';
import {
    CommandSender,
    CreateChannelData
} from '../../types';
import { Command } from '../../models/Command';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'createtextchannel',
                aliases:
                    [
                        'nuevocanal',
                        'newchannel',
                        'addchannel',
                        'createchannel'
                    ],
                description: 'Crea uno o varios canales en tu servidor.',
                category: 'Configuration',
                usage: '<categoría> (#channelId)\n<nombre>\n<número?> {default:1}',
                parameters: [
                    {
                        name: 'categoría',
                        description: 'El ID de la categoría que contendrá los canales.',
                        required: true,
                        type: 'category'
                    },
                    {
                        name: 'nombre',
                        description: 'Nombre que le daremos al nuevo canal.',
                        required: true,
                        type: 'string',
                    },
                    {
                        name: 'número',
                        description: 'Número de canales. No requerido',
                        required: false,
                        type: 'number'
                    }
                ],
                permissions: 'ManageChannels',
                helpText: '(ej. /createtextchannel 1000000000000000000 Juegos 3)',
                output: '¡Creación de canales solicitado!'
            })
    }
    async run(sender: CommandSender, args: Array<string>): Promise<void> {
        if (!CheckUserPermissions(sender.member! as GuildMember, 'ManageChannels')) return;
        const
            slash: ChatInputCommandInteraction =
                sender as ChatInputCommandInteraction,
            category: CategoryChannelResolvable =
                slash.options.getChannel('categoría')?.id!
                || args![0],
            channelName: string =
                slash.options.getString('nombre')!
                || args![1],
            channelCount: number =
                Number(slash.options.getInteger('número') || args![2])
                || 0;
        if (channelCount === 0) {
            const ChannelData: CreateChannelData = {
                message: sender!,
                name: channelName,
                parent: category,
                type: 0
            }
            Create(ChannelData);
        }
        else for (let i = 0; i < channelCount; i++) {
            const ChannelData: CreateChannelData = {
                message: sender!,
                name: `${channelName}_${i}`,
                parent: category,
                type: 0
            };
            Create(ChannelData);
        }
    }
}