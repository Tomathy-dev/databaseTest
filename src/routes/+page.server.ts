import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async () => {
	return {
		clients: await prisma.matter.findMany()
	};
}) satisfies PageServerLoad;
