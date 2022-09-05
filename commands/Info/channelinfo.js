const Command   = require("../../models/command");
module.exports  = class ChannelInfo extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'channelinfo',
                aliases:        ['infocanal','getchannel'],
                description:    'Información del canal.',
                category:       'Información',
                usage:          '<canal?> (#ChannelId) {default:current}',
                helpText:       'bla bla'
            })
    }
    async run(message, args)
    {}
}