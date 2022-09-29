import { Message } from 'discord.js';
import { CustomNotifications } from './custom'; //ignore this

export async function CreateMessage(message: Message<boolean>): Promise<void> {
    CustomNotifications(message); //Ignore this, is used for my personal server only
}