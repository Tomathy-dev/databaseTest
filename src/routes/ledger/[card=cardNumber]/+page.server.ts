import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const ledger = await prisma.ledger.findMany({
		where: {
			cardNumber: {
				endsWith: params.card
			}
		}
	});
	if (!ledger.length) {
		throw error(404, 'Ledger not found');
	}
}) satisfies PageServerLoad;
