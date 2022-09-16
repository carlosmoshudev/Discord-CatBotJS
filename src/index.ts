import { Client, Collection } from 'discord.js';
import { onReady, onMessageCreate } from './events/ClientEvents';
import environment from 'dotenv';
import clientOptions from './config/clientOptions';
import logger from './.DevTools/logger';
import './utils/Discord';

environment.config();
//#region Build Client
const client: Client<boolean> = new Client(clientOptions);
client.commands = new Collection();
client.categories = new Collection();
//#endregion
//#region Event handling
client.on('ready', client => { onReady(client) })
client.on('messageCreate', chatMessage => { onMessageCreate(chatMessage); });
client.on('debug', message => logger.debug(message));
client.on('warn', message => logger.warn(message));
client.on('error', message => logger.error(message));
//#endregion
client?.login(process.env.DISCORD_OAUTH);
