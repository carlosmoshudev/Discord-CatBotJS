const { Partials, GatewayIntentBits: Intents } = require('discord.js');
module.exports = 
{
    restTimeOffset: 0,
    partials:
    [
        Partials.Message, 
        Partials.Channel, 
        Partials.Reaction, 
        Partials.GuildMember, 
        Partials.User
    ],
    intents:
    [
        Intents.Guilds,
        Intents.GuildMembers,
        Intents.GuildMessages,
        Intents.MessageContent,
        Intents.GuildVoiceStates,
        Intents.GuildMessageReactions,
        Intents.GuildEmojisAndStickers,
    ]
}