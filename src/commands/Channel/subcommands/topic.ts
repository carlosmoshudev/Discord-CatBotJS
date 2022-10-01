import {
    GuildMember,
    Interaction,
    TextChannel
} from "discord.js";
import { CheckUserPermissions } from "../../../utils/User";

export function SetChannelTopic(slash: Interaction, channel: TextChannel, topic: string): void {
    if (!CheckUserPermissions(slash.member! as GuildMember, 'ManageChannels')
        || channel?.type !== 0) return;
    channel?.setTopic(topic);
}