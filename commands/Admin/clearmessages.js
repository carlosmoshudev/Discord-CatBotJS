const Command               = require("../../models/command");
const { checkPermissions }  = require('../../utils/User');
module.exports              = class Ping extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'clearmessages',
                aliases:        ['deletemessages', 'clearchannel', 'borrarmensajes'],
                description:    'Elimina los mensajes del canal.',
                category:       'Administración',
                usage:          '<número?> (max. 100, default 100)',
                permissions:    'ManageMessages',
                helpText:       '(ej. !clearmessages | !clearmessages 100)\n Borra los mensajes de todos los usuarios. Max 100'
            })
    }
    async run(message, args)
    {
        if(!checkPermissions(message.member, 'ManageMessages')) return;
        const deleteCounter = args[0] ? args[0] : 100;
        message.channel.bulkDelete(deleteCounter, true).catch(error => console.log(error.stack));
    }
}