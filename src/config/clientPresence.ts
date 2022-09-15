import { ActivityType } from 'discord.js';
import { ReadyConfig } from './bot.json';

const clientPresence =
{
    activities:
        [{
            name: ReadyConfig.Presence.Name,
            type: ActivityType.Watching,
        }]
}

export default clientPresence;