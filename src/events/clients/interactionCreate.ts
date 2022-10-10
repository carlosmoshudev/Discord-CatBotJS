import { Interaction } from "discord.js";

export async function InteractionCreate(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName!);
    if (!command) return;
    await command.run(interaction);
    interaction.reply(
        {
            ephemeral: true,
            content: command.executionoutput,
            allowedMentions: {
                repliedUser: false
            },
            components: [],
            embeds: [],
            files: [],
            fetchReply: false,
            flags: 64,
            tts: false,
        }).catch(console.error);
}