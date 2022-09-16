import { Collection, Client } from 'discord.js';
import { readdirSync } from 'fs';
import { Command } from '../models/Command';

const directory: string = `${process.cwd()}/src/commands/`;
const fileExtension: string = '.ts'

export function CommandLoader(client: Client): Collection<string, Command> {
    let commandsInfo: Collection<string, Command> = new Collection();
    readdirSync(directory).forEach(category => readdirSync(`${directory}${category}`).forEach(command => {
        if (command.endsWith(fileExtension)) {
            let commandScript = require(`${directory}${category}/${command}`);
            const cmd: Command = new commandScript.ConcreteCommand(client);
            commandsInfo.set(cmd.name, cmd);
        }
    }));
    return commandsInfo;
}

export function CategoryLoader(): Collection<string, string> {
    let categories: Collection<string, string> = new Collection();
    readdirSync(directory).forEach(category => categories.set(category, category));
    return categories;
}