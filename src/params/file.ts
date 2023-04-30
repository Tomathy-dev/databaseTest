import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return /^(?:2000|[1-9]\d{0,2}|0)$/.test(param);
}) satisfies ParamMatcher;
