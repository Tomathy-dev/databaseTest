import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return /^(?:\d|\d{2}|100|101)$/.test(param);
}) satisfies ParamMatcher;
