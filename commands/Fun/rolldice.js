const Command   = require("../../models/command");
module.exports  = class RollDice extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'rolldice',
                aliases:        ['lanzardado'],
                description:    'Lanza un dado de n caras.',
                category:       'Fun',
                usage:          '<faces?> {default:6}',
                helpText:       '(ej. !rolldice 14)'
            })
    }
    async run(message, args)
    {
        const faces = args[0] || 6;
        let face = Math.floor(Math.random() * faces) + 1;
        message.channel.send(`${message.author}, te ha salido un ${face}. :game_die:`)

    }
}