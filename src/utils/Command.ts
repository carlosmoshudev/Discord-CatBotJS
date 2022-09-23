import {
    Collection,
    Client
} from 'discord.js';
import { readdirSync } from 'fs';
import { Command } from '../models/Command';

type CommandAndAlias = {
    commands: Collection<string, Command>,
    aliases: Collection<string, Command>
};

const
    directory: string = `${process.cwd()}/src/commands/`,
    fileExtension: string = '.ts'

export function CommandLoader(client: Client): CommandAndAlias {
    let commandsInfo: Collection<string, Command> = new Collection();
    let aliasesInfo: Collection<string, Command> = new Collection();
    readdirSync(directory).forEach(category =>
        readdirSync(`${directory}${category}`).forEach(command => {
            if (command.endsWith(fileExtension)) {
                let commandBuilder = require(`${directory}${category}/${command}`);
                const cmd: Command = new commandBuilder.ConcreteCommand(client);
                commandsInfo.set(cmd.name, cmd);
                cmd.aliases.forEach(alias => aliasesInfo.set(alias, cmd));
            }
        }));
    return {
        commands: commandsInfo,
        aliases: aliasesInfo
    }
}

export function CategoryLoader(): Collection<string, string> {
    let categories: Collection<string, string> = new Collection();
    readdirSync(directory).forEach(category => categories.set(category, category));
    return categories;
}