require('dotenv').config();
const { Client, Collection }    = require('discord.js');
const { clientEvents }          = require('./events/Events');
const clientOptions             = require('./config/clientOptions');
const logger                    = require('./logger');
const { ReadyConfig } = require('./config/bot.json');

const client        = new Client(clientOptions);
client.commands     = new Collection();
client.categories   = new Collection();

client.on('ready',          client  => {clientEvents.onReady(client)})
client.on('messageCreate',  message => {clientEvents.onMessageCreate(message)});
client.on('debug',          message => logger.debug(message));
client.on('warn',           message => logger.warn(message));
client.on('error',          message => logger.error(message));
client.login(process.env.DISCORD_OAUTH);