const Command = require("../../models/command");
module.exports = class Say extends Command {
    constructor(client) {
        super(
            client,
            {
                name: 'say',
                aliases: ['decir', 'escribe', 'write'],
                description: 'El bot escribe lo que le pidas.',
                category: 'Fun',
                usage: '<texto>',
                helpText: '(ej. !say Hola amigos, soy un bot! ^^)'
            })
    }
    async run(message, args) {
        if (args) message.channel.send(args.join(' '));
        message.delete();
    }
}