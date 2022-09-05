const Command   = require("../../models/command");
module.exports  = class Say extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           '',
                aliases:        [''],
                description:    '',
                category:       '',
                usage:          '',
                helpText:       ''
            })
    }
    async run(message, args)
    {}
}