import {
    GuildMember,
    PartialGuildMember
} from 'discord.js';
import { MemberAdd } from './guilds/memberAdd';
import { MemberRemove } from './guilds/memberRemove';

export function onMemberAdd(member: GuildMember): void {
    MemberAdd(member)
}
export function onMemberRemove(member: GuildMember | PartialGuildMember): void {
    MemberRemove(member)
}