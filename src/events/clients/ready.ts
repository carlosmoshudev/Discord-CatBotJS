import { Client } from 'discord.js';
import { ReadyConfig } from '../../config/bot.json';
import { CommandLoader, CategoryLoader } from '../../utils/Command';
import { YellowLog, CyanLog, PurpleLog } from '../../.DevTools/cli';
import clientPresence from '../../config/clientPresence';

export function Ready(client: Client<true>): void {
    client.user.setPresence(clientPresence);
    client.commands = CommandLoader(client);
    client.categories = CategoryLoader();
    const guildsJoined: number = client.guilds.cache.size;
    const commandsLoaded: number = client.commands.size;
    const categoriesLoaded: number = client.categories.size;

    YellowLog(ReadyConfig.ReadyLog);
    CyanLog(ReadyConfig.GuildJoinLog, `${guildsJoined}.`);
    PurpleLog(ReadyConfig.CommandLoadLog, `${commandsLoaded} en ${categoriesLoaded} categorías.`);
}