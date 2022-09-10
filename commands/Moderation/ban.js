const Command   = require("../../models/command");
module.exports  = class Ban extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'ban',
                aliases:        ['banear'],
                description:    'Banea un usuario.',
                category:       'Moderation',
                permissions:    'BanMembers',
                usage:          '<member> #mention\n<days?> (default:360)',
                helpText:       '(ej. !ban @usuario 1.)'
            })
    }
    async run(message, args)
    {
        const banUser =
            message.mentions.members.first() ||
            await message.guild.members.fetch(args[0])
                .catch(error => { return });
        const banTime = args[1] || 360;
        if(banUser) await banUser.ban({days: banTime});
    }
}