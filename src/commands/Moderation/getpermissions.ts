import {
    Channel,
    ChatInputCommandInteraction,
    Client,
    GuildMember,
    Interaction,
    TextChannel,
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
    async run(sender: Interaction): Promise<void> {
        const
            slash: ChatInputCommandInteraction =
                sender as ChatInputCommandInteraction,
            member: GuildMember =
                sender.member! as GuildMember,
            channel: Channel =
                sender.channel as TextChannel;
        if (!CheckUserPermissions(member, this.permissions)) return;
        let
            mention: User | string =
                slash.options.getUser('usuario')!,
            user: GuildMember =
                await sender.guild?.members.fetch(mention)!;
        if (!user?.permissions) user = member;
        const
            permissions: string =
                user.permissions.toArray().map(permission =>
                    `${permission}\n`).join('');
        //TODO: Arreglar la salida
        channel.send(permissions);
    }
}