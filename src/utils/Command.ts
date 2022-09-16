import { Collection, Client, Message } from 'discord.js';
import { readdirSync } from 'fs';
import { Command } from '../models/Command';
import { YellowLog, CyanLog, PurpleLog } from '../.DevTools/cli';

type CommandInfo = { command: string, class: any };

const commandsDirectory: string = `${process.cwd()}/src/commands/`;
const fileExtension: string = '.ts'

export function CommandLoader(client: Client<true>): any/*Collection<unknown, unknown>*/ {
    YellowLog('Loading commands');
    const commandInfoFiller: CommandInfo[] | any = [];
    let commandsInfo: Collection<unknown, unknown> = new Collection();
    readdirSync(commandsDirectory).forEach(category => 
        readdirSync(`${commandsDirectory}${category}`).forEach(command => {
            if (command.endsWith(fileExtension)) {
                const cmd: Command = require(`${commandsDirectory}${category}/${command}`);
                commandInfoFiller.push(cmd);
                /*commandInfoFiller.push
                    ({
                        command: command.replace(fileExtension, ''),
                        class: new (cmd as any)(client)
                    })*/
            }
        })
    );
    commandsInfo = commandInfoFiller;
    return commandsInfo;
}

export function CategoryLoader(): Collection<unknown, string> {
    const categoryFiller: string[] | any = [];
    let categories: Collection<unknown, string> = new Collection();
    readdirSync(commandsDirectory).forEach(category =>
        categoryFiller.push(category));
    categories = categoryFiller;
    return categories;
}

export function Run(cmd: string | undefined, args: string[], client: Client<boolean>, message: Message): void {
    YellowLog("Run CMD");
    CyanLog(`${client.commands.size}`);
    const
        instance: Command = client.commands.filter(command =>
            command.name === cmd)[0],
        alias: Command = client.commands.filter(command =>
            command.aliases.includes(cmd!))[0],
        command: Command = instance ? instance : alias!;
    
    command?.run(message, args);
}