import {
    ChannelType,
    Client,
    RESTPostAPIApplicationCommandsJSONBody,
    SlashCommandBuilder
} from "discord.js";

import environment from 'dotenv';

environment.config();

export async function SlashCommandLoader(client: Client): Promise<void> {
    const slahsCommands: Array<RESTPostAPIApplicationCommandsJSONBody> = [];
    client.commands.forEach(command => {
        const slashCmd = new SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description);
        if (command.parameters) command.parameters.forEach(parameter => {
            if (parameter.type === 'string') slashCmd.addStringOption(option =>
                option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
            );
            else if (parameter.type === 'number') slashCmd.addIntegerOption(option =>
                option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
            );
            else if (parameter.type === 'bool') slashCmd.addBooleanOption(option =>
                option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
            );
            else if (parameter.type === 'user') slashCmd.addUserOption(option =>
                option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
            );
            else if (parameter.type === 'category') slashCmd.addChannelOption(option =>
                option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
                    .addChannelTypes(ChannelType.GuildCategory)
            );
            else if (parameter.type === 'channel') slashCmd.addChannelOption(option =>
                option
                    .setName(parameter.name)
                    .setDescription(parameter.description)
                    .setRequired(parameter.required)
                    .addChannelTypes(ChannelType.GuildText)
            )
        })
        slahsCommands.push(slashCmd.toJSON());
    })
    client.application?.commands.set(slahsCommands);
}