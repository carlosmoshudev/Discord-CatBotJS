import {
    Channel,
    Client,
    GuildMember,
    TextChannel,
    User
} from 'discord.js';
import { Command } from '../../models/Command';
import { CommandSender } from '../../types';
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
                parameters: [
                    {
                        name: 'usuario',
                        description: 'usuario sobre el que obtener info',
                        required: false,
                        type: 'user'
                    }
                ],
                permissions: 'ModerateMembers',
                helpText: '(ej. !getpermissions | !getpermissions @alguien)',
                output: 'to pa ti'
            })
    }
    async run(sender: CommandSender, args: Array<string>): Promise<void> {
        const
            member: GuildMember = sender.member! as GuildMember,
            channel: Channel = sender.channel as TextChannel;
        if (!CheckUserPermissions(member, this.permissions)) return;
        let
            mention: User | string = args[0],
            user: GuildMember = await sender.guild?.members.fetch(mention)!;
        if (!user?.permissions) user = member;
        const
            permissions: string = user.permissions.toArray().map(permission =>
                `${permission}\n`).join('');
        //TODO: Arreglar la salida
        channel.send(permissions);
    }
}