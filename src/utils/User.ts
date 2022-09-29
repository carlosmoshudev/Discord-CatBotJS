import {
    APIInteractionGuildMember,
    GuildMember,
    Permissions
} from "discord.js";

const Admin = 'Administrator';

export function CheckUserPermissions(user: GuildMember | APIInteractionGuildMember, permission: string): boolean {
    const member = user as GuildMember;
    const permissions: Array<Readonly<Permissions>> = member.permissions.toArray();
    if (permissions.includes(permission) || permissions.includes(Admin)) return true;
    else return false;
}