const { readdirSync } = require('fs');
const commandsDirectory = `${process.cwd()}/commands/`;
const fileExtension = '.js'
module.exports =
{
    CommandLoader: client => {
        const commands = [];
        readdirSync(commandsDirectory).forEach(category =>
            readdirSync(`${commandsDirectory}${category}`).forEach(command => {
                if (command.endsWith(fileExtension)) {
                    const
                        cmd = require(`${commandsDirectory}${category}/${command}`);
                    commands.push
                        ({
                            command: command.replace(fileExtension, ''),
                            class: new cmd(client)
                        })
                }
            }
            )
        );
        return commands;
    },
    CategoryLoader: () => {
        const categories = [];
        readdirSync(commandsDirectory).forEach(category =>
            categories.push(category));
        return categories;
    },
    CommandRunner: (cmd, args, client, message) => {
        const
            instance = client.commands.filter(command =>
                command.command === cmd)[0],
            alias = client.commands.filter(command =>
                command.class.aliases.includes(cmd))[0],
            command = instance ? instance.class : alias?.class;
        command?.run(message, args);
    }
}