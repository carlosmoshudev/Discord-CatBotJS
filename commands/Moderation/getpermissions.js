const Command = require("../../models/command");
const { checkPermissions } = require('../../utils/User');
module.exports = class GetPermissions extends Command {
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
        if (!checkPermissions(member, this.permissions)) return;
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