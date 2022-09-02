const { ReadyConfig: config }   = require('../../config/bot.json');
const clientPresence            = require('../../config/clientPresence');
module.exports                  = client =>
{
    if(!client) 
    {
        console.error(ReadyConfig.NotClientLog);
        return;
    }
    const guildsJoined = client.guilds.cache.map(guild => guild.name).join(' \n');
    console.log(config.ReadyLog);
    console.log(config.GuildJoinLog + guildsJoined);
    client.user.setPresence(clientPresence);

}