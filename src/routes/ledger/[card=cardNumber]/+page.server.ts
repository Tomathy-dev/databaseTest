import { prisma } from '$lib/server/prisma';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	default: async () => {
		console.log('formData received');
	}
} satisfies Actions;

export const load = (async ({ params }) => {
	const ledger = await prisma.transaction.findMany({
		take: 20,
		orderBy: {
			date: 'desc'
		}
	});
	if (!ledger.length) {
		throw error(404, 'Ledger not found');
	}
	const bank = await prisma.ledger.findFirst({
		where: {
			cardNumber: {
				endsWith: params.card
			}
		}
	});
	if (!bank) {
		throw error(404, 'Bank not found');
	}
	return {
		ledger: ledger,
		bank: {
			name: bank.name,
			totalValue: bank.totalValue
		}
	};
}) satisfies PageServerLoad;
