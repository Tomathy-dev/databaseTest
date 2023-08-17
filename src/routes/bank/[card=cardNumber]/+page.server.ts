import { prisma } from '$lib/server/prisma';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, RequestEvent, Actions } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

/**
 * Add transaction form schema
 */
const addTransactionSchema = z.object({
	file: z.string().regex(/^(?:\d{1,5}|\d{1,5}-\d{1,2})$/g),
	date: z.date(),
	description: z.string(),
	method: z.string(),
	value: z.string(),
	exchange: z.enum(['Debit', 'Credit']),
	bank: z.string()
});

/**
 * Form Actions
 */
export const actions: Actions = {
	addTransaction: async ({ request }: RequestEvent) => {
		const form = await superValidate(request, addTransactionSchema); //validation
		if (!form.valid) return fail(400, { form });
		let matter = 0;
		let file = 0;
		let value = 0n;

		const temp = form.data.file.split('-');
		file = parseInt(temp[0]);

		if (temp.length === 2) {
			matter = parseInt(temp[1]);
		}

		if (form.data.value.includes('.')) {
			const temp = form.data.value.split('.');
			if (temp[1].charAt(0) !== '0' && temp[1].length < 2) {
				temp[1] = temp[1] + '0';
			}
			form.data.value = temp.join('');
		} else {
			form.data.value = form.data.value + '00';
		}

		if (form.data.exchange === 'Credit') {
			value = BigInt(form.data.value);
		} else {
			value = BigInt(form.data.value) * -1n;
		}

		if (value === 0n || value === -0n) {
			return fail(400, { message: 'Invalid value' });
		}

		console.log(form.data);
		try {
			await prisma.$transaction(async (tx) => {
				await tx.transaction.create({
					data: {
						file: file,
						matter: matter,
						date: new Date(form.data.date),
						description: form.data.description,
						value: value,
						transactionMethod: form.data.method,
						bank: form.data.bank
					}
				});

				const oldValue = await tx.ledger.findUnique({
					where: {
						name: form.data.bank
					},
					select: {
						totalValue: true
					}
				});

				if (!oldValue) {
					return fail(400, { message: 'Invalid bank' });
				}

				console.log(oldValue.totalValue);
				console.log(value);
				await tx.ledger.update({
					where: {
						name: form.data.bank
					},
					data: {
						totalValue: oldValue?.totalValue + value
					}
				});
			});
		} catch (e) {
			return fail(400, { message: 'Invalid data' });
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
		throw fail(404, { message: 'Bank not found' });
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
		throw fail(404, { message: 'Ledger not found' });
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
