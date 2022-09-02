require('dotenv').config();
const { Client }        = require('discord.js');
const { clientEvents }  = require('./events/Events');
const clientOptions     = require('./config/clientOptions');

const client            = new Client(clientOptions);

client.on('ready',          client  => clientEvents.onReady(client));
client.on('messageCreate',  message => clientEvents.onMessageCreate(message));

client.login(process.env.DISCORD_OAUTH);