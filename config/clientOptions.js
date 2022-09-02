const { Partials: part, GatewayIntentBits: intent } = require('discord.js');
module.exports = 
{
    restTimeOffset: 0,
    partials:
    [
        part.Message, 
        part.Channel, 
        part.Reaction, 
        part.GuildMember, 
        part.User
    ],
    intents:
    [
        intent.Guilds,
        intent.GuildMembers,
        intent.GuildMessages,
        intent.MessageContent,
        intent.GuildVoiceStates,
        intent.GuildMessageReactions,
        intent.GuildEmojisAndStickers,
    ]
}