import {
    Client,
    Collection,
    Message
} from 'discord.js';
import {
    onReady,
    onMessageCreate,
    onMessageDelete,
    onMessageUpdate
} from './events/ClientEvents';
import {
    onMemberAdd,
    onMemberRemove
} from './events/GuildEvents';
import environment from 'dotenv';
import clientOptions from './config/clientOptions';
import logger from './.DevTools/logger';
import './utils/Discord';

environment.config();
//#region Build Client
const client: Client<boolean> = new Client(clientOptions);
client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();
//#endregion
//#region Event handling
client.on('ready', (client) =>
    onReady(client))
client.on('messageCreate', (chatMessage) =>
    onMessageCreate(chatMessage));
client.on("messageDelete", (deletedMessage) =>
    onMessageDelete(deletedMessage as Message));
client.on("messageUpdate", (old, message) =>
    onMessageUpdate(old as Message, message as Message))
client.on("guildMemberAdd", (member) =>
    onMemberAdd(member));
client.on("guildMemberRemove", (member) =>
    onMemberRemove(member));
//#endregion
//#region Event Logging
client.on('debug', message =>
    logger.debug(message));
client.on('warn', message =>
    logger.warn(message));
client.on('error', message =>
    logger.error(message));
//#endregion
client?.login(process.env.DISCORD_OAUTH);
