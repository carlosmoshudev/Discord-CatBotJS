import { ReadyConfig } from '../../config/bot.json';
import clientPresence from '../../config/clientPresence';
import { CommandLoader, CategoryLoader } from '../../utils/Command';
import cli from '../../.DevTools/cli';

export function Ready(client): void {
    if (!client) {
        console.error(ReadyConfig.NotClientLog);
        return;
    } 
    client!.user.setPresence(clientPresence);
    client.commands = CommandLoader(client);
    client.categories = CategoryLoader(client);

    const
        guildsJoined = client.guilds.cache.size,
        commandsLoaded = client.commands.length;
    cli.yellowLog(ReadyConfig.ReadyLog);
    cli.cyanLog(ReadyConfig.GuildJoinLog, `${guildsJoined}.`);
    cli.purpleLog(ReadyConfig.CommandLoadLog, `${commandsLoaded}.`);
}