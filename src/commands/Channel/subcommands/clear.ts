import { TextChannel } from "discord.js";

export function ClearMessages(channel: TextChannel, _counter: number = 100): void {
    channel.bulkDelete(_counter, true)
        .catch((error: Error) => console.log(error.stack));
}