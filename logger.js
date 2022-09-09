const pino      = require('pino');
const transport = pino.transport
({
    target: 'pino/file',
    options: { destination: './.Logs/client-log.json' },
});
const logger    = pino(transport);
module.exports  = logger;