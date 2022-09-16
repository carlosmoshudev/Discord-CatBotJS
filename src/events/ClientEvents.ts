import { Client, Message } from 'discord.js';
import { Ready } from './clients/ready';
import { CreateMessage } from './clients/messageCreate'
export function onReady(client : Client<true>): void {
    Ready(client);
}
export function onMessageCreate(message: Message<boolean>): void {
    CreateMessage(message);
}
