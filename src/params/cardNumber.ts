import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return /^\d{4}/.test(param);
}) satisfies ParamMatcher;
