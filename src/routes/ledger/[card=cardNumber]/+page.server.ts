import { prisma } from '$lib/server/prisma';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, RequestEvent, Actions } from './$types';

export const actions: Actions = {
	addTransaction: async ({ request }: RequestEvent) => {
		const data = await request.formData();
		const fileMatter = data.get('file');
		const date = data.get('date')?.toString();
		const description = data.get('description')?.toString();
		const method = data.get('method')?.toString();
		let value = parseFloat(data.get('value')?.toString() || '0');
		const exchange = data.get('exchange')?.toString();
		const bank = data.get('bank')?.toString();
		let matter = 0;
		let file = 0;
		if(!fileMatter || !date || !description || !method || !exchange) {
			return fail(400, { message: 'Missing required fields' });
		}
		const temp = fileMatter?.toString().split('-');
		file = parseInt(temp[0]);
		if(temp.length === 2){
			matter = parseInt(temp[1]);
		}
		if(exchange.toString() === 'Debit') {
			value *= -1;
		}
		
		console.log(file, matter, date, description, value, method, bank);
		try{
			await prisma.transaction.create({
				data: {
					file: file,
					matter: matter,
					date: new Date(date),
					description: description,
					value: value,
					transactionMethod: method,
					bank: bank
				}
			});
		} catch (e){
			return fail(400, { message: 'Invalid data' })
		}
	},
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
