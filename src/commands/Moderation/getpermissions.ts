import { Command } from '../../models/Command';
import { CheckUserPermissions } from '../../utils/User';
export class ConcreteCommand extends Command {
    constructor(client) {
        super(
            client,
            {
                name: 'getpermissions',
                aliases: ['permissions', 'permisos', 'userpermissions'],
                description: 'Obtiene los permisos.',
                category: 'Moderation',
                usage: '<member?> {default:user}',
                permissions: 'ModerateMembers',
                helpText: '(ej. !getpermissions | !getpermissions @alguien)'
            })
    }
    async run(message, args) {
        const
            member = message.member,
            channel = message.channel;
        if (!CheckUserPermissions(member, this.permissions)) return;
        let
            mention = message.mentions.users.first() || args[0],
            user = await message.guild.members.fetch(mention);
        if (!user.permissions) user = member;
        const
            permissions = user.permissions.toArray().map(permission =>
                `${permission}\n`).join('');
        //TODO: Arreglar la salida
        channel.send(permissions);
    }
}