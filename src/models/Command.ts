import { Client } from "discord.js";
import {
    CommandSender,
    Parameter
} from "../types";

export abstract class Command {
    client: Client;
    name: string;
    aliases: Array<string>;
    description: string;
    usage: string;
    parameters: Array<Parameter>;
    permissions: string;
    category: string;
    production: string;
    botpermissions: string;
    helptext: string;
    developerOnly: boolean;
    executionoutput: string;
    abstract run(sender: CommandSender, args: Array<string>): Promise<void>;
    constructor(client: Client, options: any) {
        this.client = client;
        this.name = options.name;
        this.aliases = options.aliases;
        this.description = options.description;
        this.usage = options.usage;
        this.parameters = options.parameters;
        this.permissions = options.permissions || 'cualquiera';
        this.category = options.category;
        this.production = options.production || false;
        this.botpermissions = options.botpermissions || false;
        this.helptext = options.helpText;
        this.developerOnly = options.developerOnly || false;
        this.executionoutput = options.output;
    }
}