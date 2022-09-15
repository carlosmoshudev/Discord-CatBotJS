const Command = require("../../models/command");
const { checkPermissions } = require('../../utils/User');
module.exports = class SetTopic extends Command {
    constructor(client) {
        super(
            client,
            {
                name: 'settopic',
                aliases: ['topic', 'topico', 'tematica'],
                description: 'Actualiza la temática del canal.',
                category: 'Configuration',
                permissions: 'ManageChannels',
                usage: '<topic>',
                helpText: '(ej. !settopic Canal de ayuda y soporte.)'
            })
    }
    async run(message, args) {
        const
            user = message.member,
            channel = message.channel;
        if (!checkPermissions(user, this.permissions)
            || channel.type != 0) return;
        channel.setTopic(args.join(' '));
    }
}