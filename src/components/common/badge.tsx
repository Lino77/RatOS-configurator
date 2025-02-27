import { VariantProps, cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export const badgeColorOptions = z.union([
	z.literal('rose'),
	z.literal('red'),
	z.literal('yellow'),
	z.literal('orange'),
	z.literal('green'),
	z.literal('lime'),
	z.literal('blue'),
	z.literal('sky'),
	z.literal('indigo'),
	z.literal('purple'),
	z.literal('pink'),
	z.literal('brand'),
	z.literal('gray'),
	z.literal('plain'),
]);
export const badgeTextColorStyle = cva('', {
	variants: {
		color: {
			rose: 'text-rose-700 dark:text-rose-400',
			red: 'text-red-700 dark:text-red-400',
			yellow: 'text-yellow-800 dark:text-yellow-500',
			orange: 'text-orange-800 dark:text-orange-500',
			green: 'text-green-700 dark:text-green-400',
			lime: 'text-lime-700 dark:text-lime-400',
			blue: 'text-blue-700 dark:text-blue-400',
			sky: 'text-sky-700 dark:text-sky-400',
			indigo: 'text-indigo-700 dark:text-indigo-400',
			purple: 'text-purple-700 dark:text-purple-400',
			pink: 'text-pink-700 dark:text-pink-400',
			brand: 'text-brand-700 dark:text-brand-400',
			gray: 'text-zinc-600 dark:text-zinc-400',
			plain: 'text-zinc-900 dark:text-zinc-100',
		} satisfies { [key in z.infer<typeof badgeColorOptions>]: string },
	},
});

export const badgeBackgroundColorStyle = cva('', {
	variants: {
		color: {
			rose: 'bg-rose-50 dark:bg-rose-400/10',
			red: 'bg-red-50 dark:bg-red-400/10',
			yellow: 'bg-yellow-50 dark:bg-yellow-400/10',
			orange: 'bg-orange-50 dark:bg-orange-400/10',
			green: 'bg-green-50 dark:bg-green-500/10',
			lime: 'bg-lime-50 dark:bg-lime-500/10',
			blue: 'bg-blue-50 dark:bg-blue-400/10',
			sky: 'bg-sky-50 dark:bg-sky-400/10',
			indigo: 'bg-indigo-50 dark:bg-indigo-400/10',
			purple: 'bg-purple-50 dark:bg-purple-400/10',
			pink: 'bg-pink-50 dark:bg-pink-400/10',
			brand: 'bg-brand-100 dark:bg-brand-400/10',
			gray: 'bg-zinc-50 dark:bg-zinc-400/10',
			plain: 'bg-zinc-900/10 dark:bg-zinc-100/10',
		} satisfies { [key in z.infer<typeof badgeColorOptions>]: string },
	},
});

export const badgeBorderColorStyle = cva('', {
	variants: {
		color: {
			rose: 'border-rose-600/10 dark:border-rose-400/20 ring-rose-600/10 dark:ring-rose-400/20',
			red: 'border-red-600/10 dark:border-red-400/20 ring-red-600/10 dark:ring-red-400/20',
			yellow: 'border-yellow-600/20 dark:border-yellow-400/20 ring-yellow-600/20 dark:ring-yellow-400/20',
			orange: 'border-orange-600/20 dark:border-orange-400/20 ring-orange-600/20 dark:ring-orange-400/20',
			green: 'border-green-600/20 dark:border-green-500/20 ring-green-600/20 dark:ring-green-500/20',
			lime: 'border-lime-600/20 dark:border-lime-500/20 ring-lime-600/20 dark:ring-lime-500/20',
			blue: 'border-blue-700/10 dark:border-blue-400/30 ring-blue-700/10 dark:ring-blue-400/30',
			sky: 'border-sky-700/10 dark:border-sky-400/30 ring-sky-700/10 dark:ring-sky-400/30',
			indigo: 'border-indigo-700/10 dark:border-indigo-400/30 ring-indigo-700/10 dark:ring-indigo-400/30',
			purple: 'border-purple-700/10 dark:border-purple-400/30 ring-purple-700/10 dark:ring-purple-400/30',
			pink: 'border-pink-700/10 dark:border-pink-400/20 ring-pink-700/10 dark:ring-pink-400/20',
			brand: 'border-brand-600/40 dark:border-brand-400/30 ring-brand-600/40 dark:ring-brand-400/30',
			gray: 'border-zinc-500/10 dark:border-zinc-400/20 ring-zinc-500/10 dark:ring-zinc-400/20',
			plain: 'border-zinc-900 dark:border-zinc-100 ring-zinc-900 dark:ring-zinc-100',
		} satisfies { [key in z.infer<typeof badgeColorOptions>]: string },
	},
});

const badgeStyle = cva('flex-0 inline-flex w-auto items-center rounded-md font-medium ring-1 ring-inset', {
	variants: {
		size: {
			sm: 'px-1.5 gap-1.5 py-1 text-2xs leading-3',
			md: 'px-2 gap-2 py-1 text-xs leading-4',
			lg: 'px-2 gap-2 py-1 text-xs leading-6',
		},
		color: {
			rose: [
				badgeBackgroundColorStyle({ color: 'rose' }),
				badgeBorderColorStyle({ color: 'rose' }),
				badgeTextColorStyle({ color: 'rose' }),
			],
			red: [
				badgeBackgroundColorStyle({ color: 'red' }),
				badgeBorderColorStyle({ color: 'red' }),
				badgeTextColorStyle({ color: 'red' }),
			],
			yellow: [
				badgeBackgroundColorStyle({ color: 'yellow' }),
				badgeBorderColorStyle({ color: 'yellow' }),
				badgeTextColorStyle({ color: 'yellow' }),
			],
			orange: [
				badgeBackgroundColorStyle({ color: 'orange' }),
				badgeBorderColorStyle({ color: 'orange' }),
				badgeTextColorStyle({ color: 'orange' }),
			],
			green: [
				badgeBackgroundColorStyle({ color: 'green' }),
				badgeBorderColorStyle({ color: 'green' }),
				badgeTextColorStyle({ color: 'green' }),
			],
			lime: [
				badgeBackgroundColorStyle({ color: 'lime' }),
				badgeBorderColorStyle({ color: 'lime' }),
				badgeTextColorStyle({ color: 'lime' }),
			],
			blue: [
				badgeBackgroundColorStyle({ color: 'blue' }),
				badgeBorderColorStyle({ color: 'blue' }),
				badgeTextColorStyle({ color: 'blue' }),
			],
			sky: [
				badgeBackgroundColorStyle({ color: 'sky' }),
				badgeBorderColorStyle({ color: 'sky' }),
				badgeTextColorStyle({ color: 'sky' }),
			],
			indigo: [
				badgeBackgroundColorStyle({ color: 'indigo' }),
				badgeBorderColorStyle({ color: 'indigo' }),
				badgeTextColorStyle({ color: 'indigo' }),
			],
			purple: [
				badgeBackgroundColorStyle({ color: 'purple' }),
				badgeBorderColorStyle({ color: 'purple' }),
				badgeTextColorStyle({ color: 'purple' }),
			],
			pink: [
				badgeBackgroundColorStyle({ color: 'pink' }),
				badgeBorderColorStyle({ color: 'pink' }),
				badgeTextColorStyle({ color: 'pink' }),
			],
			brand: [
				badgeBackgroundColorStyle({ color: 'brand' }),
				badgeBorderColorStyle({ color: 'brand' }),
				badgeTextColorStyle({ color: 'brand' }),
			],
			gray: [
				badgeBackgroundColorStyle({ color: 'gray' }),
				badgeBorderColorStyle({ color: 'gray' }),
				badgeTextColorStyle({ color: 'gray' }),
			],
			plain: [
				badgeBackgroundColorStyle({ color: 'plain' }),
				badgeBorderColorStyle({ color: 'plain' }),
				badgeTextColorStyle({ color: 'plain' }),
			],
		} satisfies { [key in z.infer<typeof badgeColorOptions>]: string[] },
	},
	defaultVariants: {
		size: 'md',
		color: 'gray',
	},
});

export type BadgeProps = JSX.IntrinsicElements['span'] &
	VariantProps<typeof badgeStyle> & {
		children: React.ReactNode;
		className?: string;
	};

export const Badge: React.FC<BadgeProps> = (props) => {
	const { size, color, className, children, ...forwardProps } = props;
	return (
		<span className={twMerge(badgeStyle({ size, color }), className)} {...forwardProps}>
			{children}
		</span>
	);
};
