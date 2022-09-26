import { Client } from 'discord.js';
import { ReadyConfig } from '../../config/bot.json';
import {
    CommandLoader,
    CategoryLoader
} from '../../utils/Command';
import {
    YellowLog,
    CyanLog,
    PurpleLog
} from '../../.DevTools/cli';
import clientPresence from '../../config/clientPresence';
import { SlashCommandLoader } from '../../utils/SlashCommands';

export function Ready(client: Client<true>): void {
    client.user.setPresence(clientPresence);

    const loadedCommands = CommandLoader(client);
    client.commands = loadedCommands.commands;
    client.aliases = loadedCommands.aliases;
    client.categories = CategoryLoader();

    SlashCommandLoader(client);

    const guildsJoined: number = client.guilds.cache.size;
    const commandsLoaded: number = client.commands.size;

    YellowLog(ReadyConfig.ReadyLog);
    CyanLog(ReadyConfig.GuildJoinLog, `${guildsJoined}.`);
    PurpleLog(ReadyConfig.CommandLoadLog, `${commandsLoaded}.`);
}