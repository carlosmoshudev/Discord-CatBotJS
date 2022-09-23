import {
    Client,
    Message
} from 'discord.js';
import { Ready } from './clients/ready';
import { CreateMessage } from './clients/messageCreate';
import { DeleteMessage } from './clients/messageDelete';
import { UpdateMessage } from './clients/messageUpdate';

export function onReady(client: Client<true>): void {
    Ready(client);
}
export function onMessageCreate(message: Message<boolean>): void {
    CreateMessage(message);
}
export function onMessageDelete(message: Message): void {
    DeleteMessage(message);
}
export function onMessageUpdate(old: Message, message: Message) {
    UpdateMessage(old, message)
}