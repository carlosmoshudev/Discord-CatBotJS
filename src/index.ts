require('dotenv').config();
import './utils/Discord';
import { Client, Collection } from 'discord.js';
import clientEvents from './events/ClientEvents';
import clientOptions from './config/clientOptions';
import logger from './.DevTools/logger';

const client: Client<boolean> = new Client(clientOptions);
client.commands = new Collection();
client.categories = new Collection();

client.on('ready', client => { clientEvents.onReady(client) })
client.on('messageCreate', message => { clientEvents.onMessageCreate(message) });
client.on('debug', message => logger.debug(message));
client.on('warn', message => logger.warn(message));
client.on('error', message => logger.error(message));
client.login(process.env.DISCORD_OAUTH);
