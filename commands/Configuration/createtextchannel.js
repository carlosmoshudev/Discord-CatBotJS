const Command               = require("../../models/command");
const { checkPermissions }  = require('../../utils/User');
const { createChannel }     = require('../../utils/Channels');
module.exports              = class Ping extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'createtextchannel',
                aliases:        ['nuevocanal', 'newchannel'],
                description:    'Crea canales en tu servidor.',
                category:       'Configuración',
                usage:          '<categoría> (#channelId) <nombre> <número?> (default 1)',
                permissions:    'ManageChannels',
                helpText:       '(ej. !createtextchannel 1000000000000000000 Juegos 3)'
            })
    }
    async run(message, args)
    {
        if(!checkPermissions(message.member, 'ManageChannels')) return;
        const category      = args[0];
        const channelName   = args[1];
        if(args[2]) for(let i = 0; i < args[2]; i++)createChannel(message, `${channelName}_${i}`, category, 0);
        else createChannel(message, channelName, category, 0);
    }
}