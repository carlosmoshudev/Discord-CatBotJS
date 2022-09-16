import {Client} from 'discord.js';
import { ReadyConfig } from '../../config/bot.json';
import { CommandLoader, CategoryLoader } from '../../utils/Command';
import clientPresence from '../../config/clientPresence';
import cli from '../../.DevTools/cli';

export function Ready(client: Client<true>): void {
    client.user.setPresence(clientPresence);
    client.commands = CommandLoader(client);
    client.categories = CategoryLoader();

    const
        guildsJoined = client.guilds.cache.size,
        commandsLoaded = client.commands.size;
    cli.yellowLog(ReadyConfig.ReadyLog);
    cli.cyanLog(ReadyConfig.GuildJoinLog, `${guildsJoined}.`);
    cli.purpleLog(ReadyConfig.CommandLoadLog, `${commandsLoaded}.`);
}