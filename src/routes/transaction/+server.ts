import { fail, json, type RequestEvent } from '@sveltejs/kit';

export async function PUT({ request }: RequestEvent) {
	const data = await request.json();
	if (data == null) {
		return new Response(null, { status: 400 });
	}

	try {
		await prisma.$transaction(async (tx) => {
			for (let i = 0; i < data.length; i++) {
				await tx.transaction.update({
					where: {
						id: data[i].id
					},
					data: {
						file: data[i].file,
						matter: data[i].matter,
						date: data[i].date,
						description: data[i].description,
						value: data[i].value,
						transactionMethod: data[i].transactionMethod,
						color: data[i].color
					}
				});
			}
		});
	} catch (error) {
		console.log(error);
		return fail(500, { message: 'Internal server error' });
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
					return fail(400, { message: 'Invalid data' });
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
	} catch (error) {
		console.log(error);
		return fail(500, { message: 'Internal server error' });
	}

	return new Response(null, { status: 204 });
}
