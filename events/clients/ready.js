const { ReadyConfig, MessageConfig }    = require('../../config/bot.json');
const clientPresence                    = require('../../config/clientPresence');
const { CommandLoader, CategoryLoader } = require('../../utils/Command');
const cli                               = require('../../.DevTools/cli');
module.exports                          = client =>
{
    if(!client) 
    {
        console.error(ReadyConfig.NotClientLog);
        return;
    }
    client.user.setPresence(clientPresence);
    client.commands     = CommandLoader(client);
    client.categories   = CategoryLoader(client);

    const 
    guildsJoined    = client.guilds.cache.map(guild => 
        guild.name.replace('ó','o')).join(', '),
    commandsLoaded  = client.commands.map(command => 
        MessageConfig.Prefix + command.class.name).join(', ');
    cli.yellowLog(ReadyConfig.ReadyLog);
    cli.cyanLog(ReadyConfig.GuildJoinLog);
    console.log(guildsJoined);
    cli.purpleLog(ReadyConfig.CommandLoadLog);
    console.log(commandsLoaded);
}