import { Collection, Client, Message } from 'discord.js';
import { readdirSync } from 'fs';
import { Command } from '../models/Command';
import { YellowLog, CyanLog, PurpleLog } from '../.DevTools/cli';

const directory: string = `${process.cwd()}/src/commands/`;
const fileExtension: string = '.ts'

export function CommandLoader(client): Collection<string, Command> {
    let commandsInfo: Collection<string, Command> = new Collection();
    readdirSync(directory).forEach(category => readdirSync(`${directory}${category}`).forEach(command => {
        if (command.endsWith(fileExtension)) {
            let a = require(`${directory}${category}/${command}`);
            const cmd = new a.ConcreteCommand(client);
            commandsInfo.set(cmd.name, cmd);
        }
    })
    );
    return commandsInfo;
}

export function CategoryLoader(): Collection<string, string> {
    const categoryFiller: string[] | any = [];
    let categories: Collection<string, string> = new Collection();
    readdirSync(directory).forEach(category =>
        categoryFiller.push(category));
    categories = categoryFiller;
    return categories;
}

export function Run(cmd: string | undefined, args: string[], client: Client<boolean>, message: Message): void {
    YellowLog("running command");
    if (client.commands.has(cmd!)) client.commands.get(cmd!)?.run(message, args);
    else PurpleLog(`the command ${cmd} is not in the collection ${client.commands.size}`);
}