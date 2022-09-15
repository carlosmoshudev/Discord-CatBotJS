const Admin = 'Administrator';
module.exports =
{
    checkPermissions: (member, permission) => {
        const
            memberPermissions = member.permissions.toArray();
        if (memberPermissions.includes(permission)
            || memberPermissions.includes(Admin)) return true;
        else return false;
    }
}