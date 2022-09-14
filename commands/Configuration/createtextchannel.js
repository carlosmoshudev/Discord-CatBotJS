const Command = require("../../models/command");
const { checkPermissions } = require('../../utils/User');
const { createChannel } = require('../../utils/Channels');
module.exports = class CreateChannel extends Command {
    constructor(client) {
        super(
            client,
            {
                name: 'createtextchannel',
                aliases: ['nuevocanal', 'newchannel'],
                description: 'Crea canales en tu servidor.',
                category: 'Configuration',
                usage: '<categoría> (#channelId)\n<nombre>\n<número?> {default:1}',
                permissions: 'ManageChannels',
                helpText: '(ej. !createtextchannel 1000000000000000000 Juegos 3)'
            })
    }
    async run(message, args) {
        if (!checkPermissions(message.member, 'ManageChannels')) return;
        const
            category = args[0],
            channelName = args[1],
            channelCount = args[2] || null;
        if (!channelCount) createChannel(message, channelName, category, 0);
        else
            for (let i = 0; i < channelCount; i++)
                createChannel(message, `${channelName}_${i}`, category, 0);
    }
}