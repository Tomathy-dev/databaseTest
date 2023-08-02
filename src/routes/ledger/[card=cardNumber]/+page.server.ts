import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, RequestEvent, Actions } from './$types';

export const actions: Actions = {
	colorChange: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const color = data.get('color');
		const selected = data.get('selected'); // "selected" is a string of comma seperated transaction id's (if there's more than one)
		if (!color || !selected) {
			return;
		}
		const ids = selected.toString().split(',');
		await prisma.transaction.updateMany({
			where: {
				id: {
					in: ids.map((id) => parseInt(id))
				}
			},
			data: {
				color: color.toString()
			}
		});
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
