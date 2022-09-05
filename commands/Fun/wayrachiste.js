const Command   = require("../../models/command");
module.exports  = class WayraChiste extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'wayrachiste',
                aliases:        ['wayrajoke'],
                description:    'Cuenta un chiste de Wayra. +18',
                category:       'Diversión',
                usage:          'N/A',
                helpText:       '(ej. !wayrachiste)'
            })
    }
    async run(message, args)
    {}
}