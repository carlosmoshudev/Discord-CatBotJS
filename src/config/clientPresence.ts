import {
    ActivityType,
    PresenceData
} from 'discord.js';
import { ReadyConfig } from './bot.json';

const clientPresence =
{
    activities:
        [{
            name: ReadyConfig.Presence.Name,
            type: ActivityType.Competing,
        }]
}

export default clientPresence as PresenceData;