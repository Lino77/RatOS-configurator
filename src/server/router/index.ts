// src/server/router/index.ts
import { createRouter } from './context';
import { statSync } from 'fs';

import { wifiRouter } from './wifi';
import { mcuRouter } from './mcu';
import { promisify } from 'util';
import { exec } from 'child_process';
import { getWirelessInterface } from '../../helpers/iw';
import { klippyExtensionsRouter } from './klippy-extensions';
import { moonrakerExtensionsRouter } from './moonraker-extensions';
import { printerRouter } from './printer';

export const appRouter = createRouter()
	.query('version', {
		resolve: async () => {
			return await promisify(exec)('git describe --tags --always', {
				cwd: process.env.RATOS_CONFIGURATION_PATH,
			}).then(({ stdout }) => stdout.trim());
		},
	})
	.query('klipper-version', {
		resolve: async () => {
			return await promisify(exec)('git describe --tags --always', { cwd: process.env.KLIPPER_DIR }).then(
				({ stdout }) => stdout.trim(),
			);
		},
	})
	.query('os-version', {
		resolve: async () => {
			if (process.env.NODE_ENV === 'development') {
				return 'DEV';
			}
			const releaseFile = statSync('/etc/ratos-release').isFile() ? '/etc/ratos-release' : '/etc/RatOS-release';
			return await promisify(exec)(`cat ${releaseFile}`).then(({ stdout }) => stdout.trim().replace('RatOS ', ''));
		},
	})
	.query('ip-address', {
		resolve: async () => {
			const wirelessInterface = await getWirelessInterface();
			const iface = wirelessInterface == null || wirelessInterface.trim() === '' ? 'eth0' : wirelessInterface.trim();
			return (
				(await promisify(exec)(`ip address | grep "${iface}"`).then(
					({ stdout }) => stdout.match(/inet\s(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/)?.[1],
				)) ?? 'Unknown IP'
			);
		},
	})
	.query('kill', {
		resolve: async () => {
			process.exit();
		},
	})
	.mutation('reboot', {
		resolve: async () => {
			setTimeout(() => {
				promisify(exec)('reboot');
			}, 2000);
			return {
				result: 'success',
			};
		},
	})
	.merge('mcu.', mcuRouter)
	.merge('printer.', printerRouter)
	.merge('wifi.', wifiRouter)
	.merge('klippy-extensions.', klippyExtensionsRouter)
	.merge('moonraker-extensions.', moonrakerExtensionsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
