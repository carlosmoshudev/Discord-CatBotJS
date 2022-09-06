const Command   = require("../../models/command");
module.exports  = class FlipCoin extends Command
{
    constructor(client)
    {
        super(
            client, 
            {
                name:           'flipcoin',
                aliases:        ['caraocruz','lanzarmoneda'],
                description:    'Lanza una moneda al aire.',
                category:       'Fun',
                usage:          'N/A',
                helpText:       'sin parámetros.'
            })
    }
    async run(message, args)
    {
        const faces = ['cara','cruz'];
        const dropChance = Math.random() * 100;
        let result;
        if(Math.round(dropChance) === 50) result = 'de canto';
        else result = faces[Math.round(dropChance/100)];
        message.channel.send(`${message.author}, tu moneda ha salido ${result}.`)
    }
}