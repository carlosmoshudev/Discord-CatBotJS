const pino              = require('pino');
const { PinoLogger }    =require('./config/client.json');
const transport         = pino.transport
({
    target: PinoLogger.target,
    options: { destination: PinoLogger.file },
});
const logger    = pino(transport);
module.exports  = logger;