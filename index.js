require('dotenv').config();
const { Client, Collection }    = require('discord.js');
const { clientEvents: event }   = require('./events/Events');
const clientOptions             = require('./config/clientOptions');

const client        = new Client(clientOptions);
client.commands     = new Collection();
client.categories   = new Collection();

client.on('ready',          client  => event.onReady(client));
client.on('messageCreate',  message => event.onMessageCreate(message));

client.login(process.env.DISCORD_OAUTH);