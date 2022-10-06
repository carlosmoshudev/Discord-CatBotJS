import { TextChannel } from "discord.js";

export function ClearMessages(channel: TextChannel, counter: number): void {
    channel.bulkDelete(counter).catch((error: Error) => {
        console.error(error);
    });
}