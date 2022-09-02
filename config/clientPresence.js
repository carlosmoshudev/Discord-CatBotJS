const { ActivityType: activity }    = require('discord.js');
const { ReadyConfig: config }       = require('./bot.json');
module.exports = 
{ 
    activities: 
    [{ 
        name:   config.Presence.Name,
        type:   activity.Watching,
    }] 
}