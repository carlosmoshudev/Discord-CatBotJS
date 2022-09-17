import { Partials, GatewayIntentBits, ClientOptions } from 'discord.js';
const clientOptions =
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
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildEmojisAndStickers,
        ]
}
export default clientOptions as ClientOptions;