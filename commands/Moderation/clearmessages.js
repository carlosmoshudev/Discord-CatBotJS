const Command               = require("../../models/command");
const { checkPermissions }  = require('../../utils/User');
module.exports              = class ClearMessages extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'clearmessages',
                aliases:        ['deletemessages', 'clearchannel', 'borrarmensajes'],
                description:    'Elimina los mensajes del canal.',
                category:       'Moderation',
                usage:          '<número?> {max:100, default:100}',
                permissions:    'ManageMessages',
                helpText:       '(ej. !clearmessages | !clearmessages 100)\n Borra los mensajes de todos los usuarios. Max 100'
            })
    }
    async run(message, args)
    {
        const
        member  = message.member,
        channel = message.channel;
        if(!checkPermissions(member, this.permissions)) return;
        const 
        deleteCounter = args[0] || 100;
        channel.bulkDelete(deleteCounter, true)
            .catch(error => console.log(error.stack));
    }
}