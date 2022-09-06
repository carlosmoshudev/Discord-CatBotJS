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
                category:       'Info',
                usage:          '<member?> {default:user}',
                permissions:    'ModerateMembers',
                helpText:       '(ej. !getpermissions | !getpermissions @alguien)'
            })
    }
    async run(message, args)
    {
    }
}