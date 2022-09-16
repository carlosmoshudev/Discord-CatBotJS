import pino from 'pino';
import { PinoLogger } from '../config/client.json';
const transport: any = pino.transport({
    target: PinoLogger.target,
    options: { destination: PinoLogger.file },
});
const logger: pino.Logger = pino(transport);
export default logger;