import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async () => {
	const transactions = await prisma.transaction.findMany();
	return { transactions };
}) satisfies PageServerLoad;
