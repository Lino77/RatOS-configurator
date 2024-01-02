'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface ModalProps {
	title: string;
	children: React.ReactNode;
	isLoading: boolean;
	isFailed?: boolean;
	dismissText: string;
	setOpen: (open: boolean) => void;
	open: boolean;
}

export const MutationModal: React.FC<ModalProps> = (props) => {
	const { open, setOpen } = props;

	const icon = props.isFailed ? (
		<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-800">
			<XMarkIcon className="h-6 w-6 text-red-600 dark:text-red-300" aria-hidden="true" />
		</div>
	) : (
		<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-700">
			<CheckIcon className="h-6 w-6 text-green-600 dark:text-green-100" aria-hidden="true" />
		</div>
	);

	const buttonClass = clsx(
		'inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-zinc-900 sm:text-sm',
		props.isLoading
			? 'bg-brand-600 text-base font-medium text-white opacity-50 cursor-not-allowed'
			: 'bg-brand-600 text-base font-medium text-white hover:bg-brand-700',
	);

	return (
		<Transition.Root show={open} as={Fragment} appear={true}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity dark:bg-zinc-800 dark:bg-opacity-75" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:scrollbar-thumb-zinc-600">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="dark relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all dark:bg-zinc-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 md:max-w-lg lg:max-w-xl xl:max-w-3xl">
								<div>
									{props.isLoading ? (
										<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
											<svg
												className={clsx('h-6 w-6 animate-spin text-zinc-800 dark:text-zinc-200')}
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
										</div>
									) : (
										icon
									)}
									<div className="mt-3 text-center sm:mt-5">
										<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">
											{props.title}
										</Dialog.Title>
										<div className="mt-2">
											<div className="text-sm text-zinc-500 dark:text-zinc-400">{props.children}</div>
										</div>
									</div>
								</div>
								<div className="mt-5 sm:mt-6">
									<button
										type="button"
										className={buttonClass}
										onClick={props.isLoading ? undefined : () => setOpen(false)}
										disabled={props.isLoading}
									>
										{props.dismissText}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
