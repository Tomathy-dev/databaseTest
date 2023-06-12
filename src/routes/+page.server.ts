import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

let take = -1;

export const load: PageServerLoad = (async () => {
	let transactions = await prisma.transaction.findMany({
		take: take
	});
	if (transactions.length > 1) {
		transactions = transactions.reverse();
	}
	return { transactions };
}) satisfies PageServerLoad;

export const actions = {
	default: async () => {
		take = -20;
	}
} satisfies Actions;
