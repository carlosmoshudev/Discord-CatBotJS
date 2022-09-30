import {
    ChannelType,
    Client,
    RESTPostAPIApplicationCommandsJSONBody,
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
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
            parameter.choices
                ? BuildOptionsWithChoices(slashCmd, parameter)
                : BuildOptions(slashCmd, parameter);
        })
        if (command.subcommands) {
            command.subcommands.forEach(subcommanddata => {
                const subcommand = new SlashCommandSubcommandBuilder()
                    .setName(subcommanddata.name)
                    .setDescription(subcommanddata.description);
                if (subcommanddata.parameters) subcommanddata.parameters.forEach(parameter => {
                    parameter.choices
                        ? BuildOptionsWithChoices(subcommand, parameter)
                        : BuildOptions(subcommand, parameter);
                })
                slashCmd.addSubcommand(subcommand);
            })
        }
        slahsCommands.push(slashCmd.toJSON());
    })
    client.application?.commands.set(slahsCommands);
}
function BuildOptionsWithChoices(slash: SlashCommandBuilder | SlashCommandSubcommandBuilder, parameter: Parameter): void {
    console.log(`comando ${slash.name} tiene opciones para el parámetro ${parameter.name}`)
    switch (parameter.type) {
        case 'number':
            slash.addIntegerOption(option => option
                .setName(parameter.name)
                .setDescription(parameter.description)
                .setRequired(parameter.required)
                .addChoices(parameter.choices![0])
            );
            break;
        case 'string':
            if (parameter.choices?.length === 1) {
                slash.addStringOption(option => option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
                    .addChoices(parameter.choices![0])
                );
            } else if (parameter.choices?.length === 3) {
                slash.addStringOption(option => option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
                    .addChoices(
                        parameter.choices![0],
                        parameter.choices![1],
                        parameter.choices![2]
                    )
                );
            } else if (parameter.choices?.length === 4) {
                slash.addStringOption(option => option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
                    .addChoices(
                        parameter.choices![0],
                        parameter.choices![1],
                        parameter.choices![2],
                        parameter.choices![3]
                    )
                );
            } else if (parameter.choices?.length === 5) {
                slash.addStringOption(option => option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
                    .addChoices(
                        parameter.choices![0],
                        parameter.choices![1],
                        parameter.choices![2],
                        parameter.choices![3],
                        parameter.choices![4]
                    )
                );
            }
            break;
        default:
            BuildOptions(slash, parameter);
            break;
    }
}
function BuildOptions(slash: SlashCommandBuilder | SlashCommandSubcommandBuilder, parameter: Parameter): void {
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