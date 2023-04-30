import type { PageLoad } from './$types';

export const load = (({ data }) => {
	return {
		post: {
			title: `Title lmao`,
			content: `Idk what to put here`
		},
		gamer: data
	};
}) satisfies PageLoad;
