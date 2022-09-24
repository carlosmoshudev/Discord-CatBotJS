import {
    Channel,
    Client,
    GuildMember,
    Message,
    User
} from 'discord.js';
import { Command } from '../../models/Command';
import { CheckUserPermissions } from '../../utils/User';

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'getpermissions',
                aliases:
                    [
                        'permissions',
                        'permisos',
                        'userpermissions'
                    ],
                description: 'Obtiene los permisos.',
                category: 'Moderation',
                usage: '<member?> {default:user}',
                permissions: 'ModerateMembers',
                helpText: '(ej. !getpermissions | !getpermissions @alguien)'
            })
    }
    async run(message: Message, args: Array<string>): Promise<void> {
        const
            member: GuildMember = message.member!,
            channel: Channel = message.channel;
        if (!CheckUserPermissions(member, this.permissions)) return;
        let
            mention: User | string = message.mentions.users.first() || args[0],
            user: GuildMember = await message.guild?.members.fetch(mention)!;
        if (!user?.permissions) user = member;
        const
            permissions: string = user.permissions.toArray().map(permission =>
                `${permission}\n`).join('');
        //TODO: Arreglar la salida
        channel.send(permissions);
    }
}