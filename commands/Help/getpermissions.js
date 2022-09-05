const Command   = require("../../models/command");
const { checkPermissions } = require('../../utils/User');
module.exports  = class Ping extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'getpermissions',
                aliases:        ['permissions', 'permisos', 'userpermissions'],
                description:    'Obtiene los permisos.',
                category:       'Información',
                usage:          '<member?> (default yourself)',
                permissions:    'ModerateMembers',
                helpText:       '(ej. !getpermissions | !getpermissions @alguien)'
            })
    }
    async run(message, args)
    {
    }
}