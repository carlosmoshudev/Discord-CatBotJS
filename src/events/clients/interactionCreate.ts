import { Interaction } from "discord.js";

export async function InteractionCreate(interaction: Interaction) {
    if (!interaction.isButton()) return;
    interaction.reply(`
    botón: ${interaction.customId}
    `);
}