import {
    Client,
    Message
} from "discord.js";

export abstract class Command {
    client: Client;
    name: string;
    aliases: string[];
    description: string;
    args: boolean;
    usage: string;
    subcommands: string[];
    cooldown: number;
    permissions: string;
    category: string;
    production: string;
    botpermissions: string;
    helptext: string;
    developerOnly: boolean;
    abstract run(message: Message<boolean>, args: string[]): Promise<void>;
    constructor(client: Client, options: any) {
        this.client = client;
        this.name = options.name;
        this.aliases = options.aliases;
        this.description = options.description;
        this.args = options.args || false;
        this.usage = options.usage;
        this.subcommands = options.subcommands;
        this.cooldown = options.cooldown || false;
        this.permissions = options.permissions || 'cualquiera';
        this.category = options.category;
        this.production = options.production || false;
        this.botpermissions = options.botpermissions || false;
        this.helptext = options.helpText;
        this.developerOnly = options.developerOnly || false;
    }
}