import { Collection, Client } from 'discord.js';
import { readdirSync } from 'fs';
const commandsDirectory = `${process.cwd()}/src/commands/`;
const fileExtension = '.js'
type CommandInfo = { command: string, class: any };

export function CommandLoader(client: Client<true>): Collection<unknown, unknown> {
    const 
    commandInfoFiller: CommandInfo[] | any = [];
    let 
    commandsInfo: Collection<unknown, unknown> = new Collection();
    readdirSync(commandsDirectory).forEach(category =>
        readdirSync(`${commandsDirectory}${category}`).forEach(command => {
            if (command.endsWith(fileExtension)) {
                const
                    cmd = require(`${commandsDirectory}${category}/${command}`);
                commandInfoFiller.push
                    ({
                        command: command.replace(fileExtension, ''),
                        class: new cmd(client)
                    })
            }
        }
        )
    );
    commandsInfo = commandInfoFiller;
    return commandsInfo;
}
export function CategoryLoader(): Collection<unknown, unknown> {
    const categoryFiller: string[] | any = [];
    let categories: Collection<unknown, unknown> = new Collection();
    readdirSync(commandsDirectory).forEach(category =>
        categoryFiller.push(category));
    categories = categoryFiller;
    return categories;
}
export function CommandRunner(cmd, args, client, message) {
    const
        instance = client.commands.filter(command =>
            command.command === cmd)[0],
        alias = client.commands.filter(command =>
            command.class.aliases.includes(cmd))[0],
        command = instance ? instance.class : alias?.class;
    command?.run(message, args);
}