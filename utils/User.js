module.exports =
{
    checkPermissions: (member, permission) =>
    {
        const memberPermissions = member.permissions.toArray();
        if(memberPermissions.includes(permission)
        || memberPermissions.includes('Administrator')) return true;
        else return false;
    }
}