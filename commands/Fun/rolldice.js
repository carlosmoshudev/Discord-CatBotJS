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
                category:       'Diversión',
                usage:          '<faces?> {default:6}',
                helpText:       ''
            })
    }
    async run(message, args)
    {
        let faces = args[0]? args[0] : 6;
        console.log(`args ` + args[0]);
        const dice = [];
        for(let i = 1; i < faces + 1; i++) {console.log(faces+1); console.log(i)};

    }
}