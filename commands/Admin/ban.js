const Command   = require("../../models/command");
module.exports  = class Ban extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'ban',
                aliases:        ['banear'],
                description:    'Banea un usuario.',
                category:       'Administración',
                permissions:    'BanMembers',
                usage:          '<member> #mention\n<reason?>',
                helpText:       '(ej. !ban @usuario Lenguaje inapropiado.)'
            })
    }
    async run(message, args)
    {}
}