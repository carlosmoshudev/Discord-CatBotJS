module.exports = class Command 
{
    constructor(client, options) 
    {
        this.client         = client;
        this.name           = options.name;
        this.aliases        = options.aliases;
        this.description    = options.description;
        this.args           = options.args || false;
        this.usage          = options.usage;
        this.subcommands    = options.subcommands;
        this.cooldown       = options.cooldown || false;
        this.permissions    = options.permissions || 'cualquiera';
        this.category       = options.category;
        this.production     = options.production || false;
        this.botpermissions = options.botpermissions || false;
        this.helptext       = options.helptext;
        this.developerOnly  = options.developerOnly || false;
    }
}