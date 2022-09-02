const { Ready }         = require('../../config/bot.json');
const clientPresence    = require('../../config/clientPresence');
module.exports          = client =>
{
    if(!client) 
    {
        console.error(Ready.NotClientLog);
        return;
    }
    const guildsJoined = client.guilds.cache.map(guild => guild.name).join(' \n');
    console.log(Ready.ReadyLog);
    console.log(Ready.GuildJoinLog + guildsJoined);
    client.user.setPresence(clientPresence);

}