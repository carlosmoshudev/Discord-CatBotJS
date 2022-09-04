module.exports = class Command 
{
    constructor(client, options) 
    {
        this.client         = client;
        this.name           = options.name;
        this.aliases        = options.aliases;
        this.description    = options.description;
        this.args           = options.args || false;
        this.inactive       = options.inactive || false;
        this.exclusive      = options.exclusive || false;
        this.usage          = options.usage;
        this.type           = options.type;
        this.options        = options.options || false;
        this.role           = options.role || false;
        this.subcommands    = options.subcommands;
        this.cooldown       = options.cooldown || false;
        this.permissions    = options.permissions || 'cualquiera';
        this.nochannel      = options.nochannel || false;
        this.category       = options.category;
        this.production     = options.production || false;
        this.botpermissions = options.botpermissions || false;
        this.tos            = options.tos || false;
        this.spam           = options.spam || false;
        this.helpText       = options.helpText;
    }
}