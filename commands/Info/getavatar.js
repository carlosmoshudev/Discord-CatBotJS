const Command   = require("../../models/command");
module.exports  = class GetAvatar extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'getavatar',
                aliases:        ['avatar','profilepic','getuserpic'],
                description:    'Obtiene la foto de perfil.',
                category:       'Información',
                usage:          '<member?> {default:user}',
                helpText:       ''
            })
    }
    async run(message, args)
    {}
}