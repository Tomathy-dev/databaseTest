import { error, json, type RequestEvent } from '@sveltejs/kit';

export async function PUT({ request }: RequestEvent) {
	const data = await request.json();
	if (data == null) {
		return new Response(null, { status: 400 });
	}

	try {
		await prisma.$transaction(async (tx) => {
			for (let i = 0; i < data.length; i++) {
				const oldTransactionValue = await tx.transaction.findUnique({
					where: {
						id: data[i].id
					},
					select: {
						value: true
					}
				});

				if (!oldTransactionValue) {
					return error(400, { message: 'Invalid id' });
				}

				await tx.transaction.update({
					where: {
						id: data[i].id
					},
					data: {
						file: data[i].file,
						matter: data[i].matter,
						date: data[i].date,
						description: data[i].description,
						value: BigInt(data[i].value),
						transactionMethod: data[i].transactionMethod,
						color: data[i].color
					}
				});

				const oldValue = await tx.ledger.findUnique({
					where: {
						name: data[i].bank
					},
					select: {
						totalValue: true
					}
				});

				if (!oldValue) {
					return error(400, { message: 'Invalid bank' });
				}

				await tx.ledger.update({
					where: {
						name: data[i].bank
					},
					data: {
						totalValue: oldValue?.totalValue - oldTransactionValue.value + BigInt(data[i].value)
					}
				});
			}
		});
	} catch (e) {
		console.log(e);
		return error(500, { message: 'Internal server error' });
	}

	return new Response(null, { status: 204 });
}

export async function DELETE({ request }: RequestEvent) {
	const data = await request.json();
	if (data == null) {
		return json({ status: 400 });
	}

	try {
		await prisma.$transaction(async (tx) => {
			for (let i = 0; i < data.length; i++) {
				const temp = await tx.transaction.findUnique({
					where: {
						id: data[i]
					}
				});
				const oldValue = await tx.ledger.findUnique({
					where: {
						name: temp?.bank
					},
					select: {
						totalValue: true
					}
				});

				if (!temp || !oldValue) {
					return error(400, { message: 'Invalid data' });
				}
				await tx.ledger.update({
					where: {
						name: temp?.bank
					},
					data: {
						totalValue: oldValue?.totalValue - temp?.value
					}
				});
				await tx.transaction.delete({
					where: {
						id: data[i]
					}
				});
			}
		});
	} catch (e) {
		console.log(e);
		return error(500, { message: 'Internal server error' });
	}

	return new Response(null, { status: 204 });
}
