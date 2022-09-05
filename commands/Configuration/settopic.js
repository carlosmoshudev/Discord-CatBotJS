const Command   = require("../../models/command");
const { checkPermissions } = require('../../utils/User');
module.exports  = class Ping extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'settopic',
                aliases:        ['topic', 'topico', 'tematica'],
                description:    'Actualiza la temática del canal.',
                category:       'Configuración',
                permissions:    'ManageChannels',
                usage:          '<topic>',
                helpText:       '(ej. !settopic Canal de ayuda y soporte.)'
            })
    }
    async run(message, args)
    {
        if(!checkPermissions(message.member, 'ManageChannels')) return;
        message.channel.setTopic(args.join(' '));
    }
}