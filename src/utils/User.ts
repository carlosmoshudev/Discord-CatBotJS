import {
    GuildMember,
    Permissions
} from "discord.js";

const Admin = 'Administrator';

export function CheckUserPermissions(user: GuildMember, permission: string): boolean {
    const permissions: Array<Readonly<Permissions>> = user.permissions.toArray();
    if (permissions.includes(permission) || permissions.includes(Admin)) return true;
    else return false;
}