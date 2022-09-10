const { ReadyConfig }    = require('../../config/bot.json');
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
    guildsJoined    = client.guilds.cache.size,
    commandsLoaded  = client.commands.length;
    cli.yellowLog(ReadyConfig.ReadyLog);
    cli.cyanLog(ReadyConfig.GuildJoinLog, `${guildsJoined}.`);
    cli.purpleLog(ReadyConfig.CommandLoadLog, `${commandsLoaded}.`);
}