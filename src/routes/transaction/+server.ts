import { json, type RequestEvent } from '@sveltejs/kit';

export async function PUT({ request }: RequestEvent) {
	const data = await request.json();
	if (data == null) {
		return json({ status: 400 });
	}

	try {
		await prisma.$transaction(async (tx) => {
			for (let i = 0; i < data.length; i++) {
				const transaction = await tx.transaction.update({
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
	}

	return json({ status: 204 });
}
