import { InformationCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface InfoMessageProps extends React.PropsWithChildren {
	title?: string;
}

export const InfoMessage: React.FC<InfoMessageProps> = (props) => {
	return (
		<div className="rounded-md bg-cyan-50 p-4 dark:bg-cyan-800">
			<div className="flex">
				<div className="flex-shrink-0">
					<InformationCircleIcon className="h-5 w-5 text-cyan-400" aria-hidden="true" />
				</div>
				<div className="ml-3">
					<h3 className="text-sm font-medium text-cyan-800 dark:text-cyan-100">{props.title ?? 'Info'}</h3>
					<div className="mt-2 text-sm text-cyan-700 dark:text-cyan-200">
						<p>{props.children}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
