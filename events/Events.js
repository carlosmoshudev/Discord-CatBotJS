module.exports =
{
    clientEvents:
    {
        onReady: client => require('./clients/ready')(client),
        onMessageCreate: message => require('./clients/messageCreate')(message)
    }
}