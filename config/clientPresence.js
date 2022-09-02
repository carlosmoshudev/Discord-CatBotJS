const { ActivityType } = require('discord.js');
const { Ready } = require('./bot.json');
module.exports = 
{ 
    activities: 
    [{ 
        name:   Ready.Presence.Name,
        type:   ActivityType.Watching,
    }] 
}