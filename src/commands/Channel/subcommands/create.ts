import {
    CategoryChannelResolvable,
    Interaction
} from "discord.js";
import { CreateChannelData } from "../../../types";
import { Create } from "../../../utils/Channels";

export function CreateChannel(
    slash: Interaction,
    category: CategoryChannelResolvable,
    channelName: string,
    counter: number): void {
    if (counter > 0) {
        for (let i = 0; i < counter; i++) {
            const data: CreateChannelData = {
                slash: slash,
                name: `${channelName}-${i}`,
                parent: category,
                type: 0
            };
            Create(data);
        }
    }
    else {
        const data: CreateChannelData = {
            slash: slash,
            name: channelName,
            parent: category,
            type: 0
        };
        Create(data);
    }
}