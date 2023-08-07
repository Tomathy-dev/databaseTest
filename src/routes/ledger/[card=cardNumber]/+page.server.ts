import { prisma } from '$lib/server/prisma';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, RequestEvent, Actions } from './$types';
import {z} from 'zod';
import {superValidate} from 'sveltekit-superforms/server'

const addTransactionSchema = z.object({
	file: z.string().regex(/^[0-9]{1,5}-[0-9]{2}$/g),
	date: z.string(),
	description: z.string(),
	method: z.date(),
	value: z.string(),
	bank: z.string()
});

export const actions: Actions = {
	addTransaction: async ({ request }: RequestEvent) => {
		const form = await superValidate(request, addTransactionSchema);
		if(!form.valid) return fail(400, {form});
		let matter = 0;
		let file = 0;
		let value = 0n;
		if (!fileMatter || !date || !description || !method || !bank || !value) {
			return error(400, { message: 'Missing required fields' });
		}

		const temp = fileMatter?.toString().split('-');
		file = parseInt(temp[0]);

		if (temp.length === 2) {
			matter = parseInt(temp[1]);
		}
		
		if(string_value === null || string_value === undefined) {
			return error(400, { message: 'Invalid value' });
		}

		if(string_value.includes('.')) {
			string_value = string_value.replace('.', '');
		}

		value = BigInt(string_value);

		if(value === 0n || value === -0n) {
			return error(400, { message: 'Invalid value' });
		}

		console.log(file, matter, date, description, value, method, bank);
		try {
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
		} catch (e) {
			return error(400, { message: 'Invalid data' });
		}
	}
} satisfies Actions;

export const load = (async ({ params }) => {
	const form = superValidate(addTransactionSchema);
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
	const ledger = await prisma.transaction.findMany({
		take: 20,
		where: {
			bank: bank.name
		},
		orderBy: {
			date: 'desc'
		}
	});
	if (!ledger.length) {
		throw error(404, 'Ledger not found');
	}
	return {
		form,
		ledger: ledger,
		bank: {
			name: bank.name,
			totalValue: bank.totalValue
		}
	};
}) satisfies PageServerLoad;
