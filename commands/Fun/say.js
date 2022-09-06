const Command   = require("../../models/command");
module.exports  = class Say extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'say',
                aliases:        ['habla'],
                description:    'El bot escribe lo que le pidas.',
                category:       'Fun',
                usage:          '<texto>',
                helpText:       '(ej. !say Hola amigos, soy un bot! ^^)'
            })
    }
    async run(message, args)
    {}
}