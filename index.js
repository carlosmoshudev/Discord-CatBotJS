require('dotenv').config();
const { Client, Collection }    = require('discord.js');
const { clientEvents }          = require('./events/Events');
const clientOptions             = require('./config/clientOptions');
const logger                    = require('./logger');
const { ReadyConfig } = require('./config/bot.json');

const client        = new Client(clientOptions);
client.commands     = new Collection();
client.categories   = new Collection();

client.on('ready',          client  => 
{
    logger.info(ReadyConfig.ReadyLog);
    clientEvents.onReady(client)
})
client.on('messageCreate',  message => 
{
    clientEvents.onMessageCreate(message)
});
client.on('debug',  msg => logger.debug(msg));
client.on('warn',   msg => logger.warn(msg));
client.on('error',  msg => logger.error(msg));
client.login(process.env.DISCORD_OAUTH);