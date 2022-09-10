const { ActivityType }  = require('discord.js');
const { ReadyConfig }   = require('./bot.json');
module.exports          = 
{ 
    activities: 
    [{ 
        name:   ReadyConfig.Presence.Name,
        type:   ActivityType.Watching,
    }] 
}