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
    _counter: number = 0): void {
    if (_counter === 0) {
        const ChannelData: CreateChannelData = {
            slash: slash!,
            name: channelName,
            parent: category,
            type: 0
        }
        Create(ChannelData);
    }
    else for (let i = 0; i < _counter; i++) {
        const ChannelData: CreateChannelData = {
            slash: slash!,
            name: `${channelName}_${i}`,
            parent: category,
            type: 0
        };
        Create(ChannelData);
    }
}