import pino from 'pino';
import pretty from 'pino-pretty';

let logger: pino.Logger<pino.LoggerOptions> | null = null;
export const getLogger = () => {
	if (logger != null) {
		return logger;
	}
	if (process.env.LOG_FILE == null) {
		throw new Error('No LOG_FILE specified in environment');
	}
	const transportOption =
		process.env.NODE_ENV === 'development'
			? {
					target: 'pino-pretty',
			  }
			: {
					target: 'pino/file',
					options: { destination: process.env.LOG_FILE, append: false }, // Truncate the log when service is restarted. In case of a crash this might not be great.
			  };
	const stream = pretty({
		colorize: true
	})
	logger = pino(stream);
	return logger;
};
