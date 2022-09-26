import {
    Client,
    SlashCommandBuilder
} from "discord.js";

import environment from 'dotenv';

environment.config();

export async function SlashCommandLoader(client: Client) {
    const slahsCommands: any[] = [];
    client.commands.forEach(cmd => {
        const slashCmd = new SlashCommandBuilder()
            .setName(cmd.name)
            .setDescription(cmd.description);
        if (cmd.parameters) cmd.parameters.forEach(param => {
            slashCmd.addStringOption(option =>
                option
                    .setName(param.name)
                    .setDescription(param.description)
                    .setRequired(param.required)
            )
        })
        slahsCommands.push(slashCmd.toJSON());
    })
    client.application?.commands.set(slahsCommands);
}