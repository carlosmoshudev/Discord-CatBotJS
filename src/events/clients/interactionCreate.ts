import { Interaction } from "discord.js";

export async function InteractionCreate(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName!);
    command?.run(interaction);
    await interaction.reply(
        {
            ephemeral: true,
            content: command?.executionoutput,
        });
}