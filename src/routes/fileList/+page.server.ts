import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
	const files = await prisma.file.findMany({
		orderBy: {
			id: 'desc'
		},
		include: {
			matters: true
		}
	});
	return { files };
};
