import { Collection } from 'discord.js';
import { Command } from '../models/Command'
declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, Command>,
        categories: Collection<unknown, string>
    }
}