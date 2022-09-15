import pino from 'pino';
import { PinoLogger } from '../config/client.json';
const transport = pino.transport({
    target: PinoLogger.target,
    options: { destination: PinoLogger.file },
});
const logger = pino(transport);
export default logger;