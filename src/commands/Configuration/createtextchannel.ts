import {
    CategoryChannelResolvable,
    Client,
    Message
} from 'discord.js';
import { CheckUserPermissions } from '../../utils/User';
import { Create } from '../../utils/Channels';
import { CreateChannelData } from '../../types';
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
                description: 'Crea canales en tu servidor.',
                category: 'Configuration',
                usage: '<categoría> (#channelId)\n<nombre>\n<número?> {default:1}',
                permissions: 'ManageChannels',
                helpText: '(ej. !createtextchannel 1000000000000000000 Juegos 3)'
            })
    }
    async run(message: Message, args: Array<string>): Promise<void> {
        if (!CheckUserPermissions(message.member!, 'ManageChannels')) return;
        const
            category: CategoryChannelResolvable = args[0],
            channelName: string = args[1],
            channelCount: number = Number(args[2]) || 0;
        if (channelCount === 0) {
            const ChannelData: CreateChannelData = {
                message: message,
                name: channelName,
                parent: category,
                type: 0
            }
            Create(ChannelData);
        }
        else for (let i = 0; i < channelCount; i++) {
            const ChannelData: CreateChannelData = {
                message: message,
                name: `${channelName}_${i}`,
                parent: category,
                type: 0
            };
            Create(ChannelData);
        }
    }
}