const Command   = require("../../models/command");
module.exports  = class Role extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'role',
                aliases:        ['habla'],
                description:    'El bot escribe lo que le pidas.',
                category:       'Administración',
                usage:          '<texto>',
                helpText:       '(ej. !say Hola amigos, soy un bot! ^^)'
            })
    }
    async run(message, args)
    {}
}