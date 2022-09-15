import { readdirSync } from 'fs';
const commandsDirectory = `${process.cwd()}/src/commands/`;
const fileExtension = '.js'
type CommandInfo = { command, class };

export function CommandLoader(client) {
    const commandsInfo: CommandInfo[] = [];
    readdirSync(commandsDirectory).forEach(category =>
        readdirSync(`${commandsDirectory}${category}`).forEach(command => {
            if (command.endsWith(fileExtension)) {
                const
                    cmd = require(`${commandsDirectory}${category}/${command}`);
                commandsInfo.push
                    ({
                        command: command.replace(fileExtension, ''),
                        class: new cmd(client)
                    })
            }
        }
        )
    );
    return commandsInfo;
}
export function CategoryLoader() {
    const categories: string[] = [];
    readdirSync(commandsDirectory).forEach(category =>
        categories.push(category));
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