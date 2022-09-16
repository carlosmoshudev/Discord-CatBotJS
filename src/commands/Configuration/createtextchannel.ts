import { Command } from '../../models/Command';
import { CheckUserPermissions } from '../../utils/User';
import { Create } from '../../utils/Channels';
import { Client, Message } from 'discord.js';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'createtextchannel',
                aliases: ['nuevocanal', 'newchannel'],
                description: 'Crea canales en tu servidor.',
                category: 'Configuration',
                usage: '<categoría> (#channelId)\n<nombre>\n<número?> {default:1}',
                permissions: 'ManageChannels',
                helpText: '(ej. !createtextchannel 1000000000000000000 Juegos 3)'
            })
    }
    async run(message: Message, args: string[]): Promise<void> {
        if (!CheckUserPermissions(message.member, 'ManageChannels')) return;
        const
            category: string = args[0],
            channelName: string = args[1],
            channelCount: number = Number(args[2]) || 0;
        if (channelCount === 0) Create(message, channelName, category, 0);
        else
            for (let i = 0; i < channelCount; i++)
                Create(message, `${channelName}_${i}`, category, 0);
    }
}