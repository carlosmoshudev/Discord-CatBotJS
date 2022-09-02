const { ReadyConfig: config, MessageConfig: message}   = require('../../config/bot.json');
const clientPresence            = require('../../config/clientPresence');
const { Loader }                = require('../../utils/Command');
module.exports                  = client =>
{
    if(!client) 
    {
        console.error(ReadyConfig.NotClientLog);
        return;
    }
    console.log(config.ReadyLog);
    const guildsJoined = client.guilds.cache.map(guild => guild.name).join(' \n');
    console.log(config.GuildJoinLog + guildsJoined);
    client.user.setPresence(clientPresence);
    client.commands = Loader(client);
    console.log(config.CommandLoadLog + client.commands.map(
        cmd => message.Prefix + cmd.class.name + ' | ' + cmd.class.description));

}