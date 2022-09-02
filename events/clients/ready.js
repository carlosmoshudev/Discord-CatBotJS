const { ReadyConfig, MessageConfig }    = require('../../config/bot.json');
const clientPresence                    = require('../../config/clientPresence');
const { Loader }                        = require('../../utils/Command');
module.exports                          = client =>
{
    if(!client) 
    {
        console.error(ReadyConfig.NotClientLog);
        return;
    }
    console.log(ReadyConfig.ReadyLog);
    const guildsJoined = client.guilds.cache.map(guild => guild.name).join(' \n');
    console.log(ReadyConfig.GuildJoinLog + guildsJoined);
    client.user.setPresence(clientPresence);
    client.commands = Loader(client);
    console.log(ReadyConfig.CommandLoadLog + client.commands.map(
        cmd => MessageConfig.Prefix + cmd.class.name + ' | ' + cmd.class.description));

}