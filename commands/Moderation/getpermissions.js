const Command               = require("../../models/command");
const { checkPermissions }  = require('../../utils/User');
module.exports              = class GetPermissions extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'getpermissions',
                aliases:        ['permissions', 'permisos', 'userpermissions'],
                description:    'Obtiene los permisos.',
                category:       'Moderation',
                usage:          '<member?> {default:user}',
                permissions:    'ModerateMembers',
                helpText:       '(ej. !getpermissions | !getpermissions @alguien)'
            })
    }
    async run(message, args)
    {
        if(!checkPermissions(message.member, 'ModerateMembers')) return;
        let 
        mentionedUser   = message.mentions.users.first(),
        userMember      = await message.guild.members.fetch(mentionedUser);
        if(!userMember.permissions) userMember = message.member;
        console.log(userMember.permissions)
        const permissions     = userMember.permissions.toArray().map(perm => `${perm}\n`).join('');
        //TODO: Arreglar la salida
        message.reply(permissions);
    }
}