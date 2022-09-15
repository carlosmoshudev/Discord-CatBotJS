const Admin = 'Administrator';
export function CheckUserPermissions(user, permission): boolean {
    const permissions = user.permissions.toArray();
    if (permissions.includes(permission)|| permissions.includes(Admin)) return true;
    else return false;
}