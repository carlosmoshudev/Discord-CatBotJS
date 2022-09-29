import {
    ChannelType,
    Client,
    RESTPostAPIApplicationCommandsJSONBody,
    SlashCommandBuilder
} from "discord.js";

import environment from 'dotenv';
import { Parameter } from "../types";

environment.config();

export async function SlashCommandLoader(client: Client): Promise<void> {
    const slahsCommands: Array<RESTPostAPIApplicationCommandsJSONBody> = [];
    client.commands.forEach(command => {
        const slashCmd = new SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description);
        if (command.parameters) command.parameters.forEach(parameter => {
            parameter.options
                ? BuildOptionsWithChoices(slashCmd, parameter)
                : BuildOptions(slashCmd, parameter);
        })
        if (command.subcommands && false) {
            slashCmd.addSubcommand(subcmd =>
                subcmd
                    .setName('test')
                    .setDescription('this is a test')
            )
        }
        slahsCommands.push(slashCmd.toJSON());
    })
    client.application?.commands.set(slahsCommands);
}
function BuildOptionsWithChoices(slash: SlashCommandBuilder, parameter: Parameter): void {
    console.log(`comando ${slash.name} tiene opciones para el parámetro ${parameter.name}`)
    switch (parameter.type) {
        case 'number':
            slash.addIntegerOption(option => option
                .setName(parameter.name)
                .setDescription(parameter.description)
                .setRequired(parameter.required)
                .addChoices(parameter.options![0])
            );
            break;
        case 'string':
            if (parameter.options?.length === 1) {
                slash.addStringOption(option => option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
                    .addChoices(parameter.options![0])
                );
            } else if (parameter.options?.length === 3) {
                slash.addStringOption(option => option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
                    .addChoices(
                        parameter.options![0],
                        parameter.options![1],
                        parameter.options![2]
                    )
                );
            } else if (parameter.options?.length === 4) {
                slash.addStringOption(option => option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
                    .addChoices(
                        parameter.options![0],
                        parameter.options![1],
                        parameter.options![2],
                        parameter.options![3]
                    )
                );
            } else if (parameter.options?.length === 5) {
                slash.addStringOption(option => option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
                    .addChoices(
                        parameter.options![0],
                        parameter.options![1],
                        parameter.options![2],
                        parameter.options![3],
                        parameter.options![4]
                    )
                );
            }
            break;
        default:
            BuildOptions(slash, parameter);
            break;
    }
}
function BuildOptions(slash: SlashCommandBuilder, parameter: Parameter): void {
    switch (parameter.type) {
        case 'bool':
            slash.addBooleanOption(option => option
                .setName(parameter.name)
                .setDescription(parameter.description)
                .setRequired(parameter.required)
            );
            break;
        case 'category':
            slash.addChannelOption(option => option
                .setName(parameter.name)
                .setDescription(parameter.description)
                .setRequired(parameter.required)
                .addChannelTypes(ChannelType.GuildCategory)
            );
            break;
        case 'channel':
            slash.addChannelOption(option => option
                .setName(parameter.name)
                .setDescription(parameter.description)
                .setRequired(parameter.required)
                .addChannelTypes(ChannelType.GuildText)
            );
            break;
        case 'number':
            slash.addIntegerOption(option => option
                .setName(parameter.name)
                .setDescription(parameter.description)
                .setRequired(parameter.required)
            );
            break;
        case 'role':
            slash.addRoleOption(option => option
                .setName(parameter.name)
                .setDescription(parameter.description)
                .setRequired(parameter.required)
            );
            break;
        case 'string':
            slash.addStringOption(option => option
                .setName(parameter.name)
                .setDescription(parameter.description)
                .setRequired(parameter.required)
            );
            break;
        case 'user':
            slash.addUserOption(option => option
                .setName(parameter.name)
                .setDescription(parameter.description)
                .setRequired(parameter.required)
            );
            break;
        default:
            console.error(`Algo ha ido mal con el comando ${slash.name}`);
            break;
    }
}