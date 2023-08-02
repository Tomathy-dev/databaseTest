import { json, type RequestEvent } from '@sveltejs/kit';

export async function PUT({ request }: RequestEvent) {
	const data = await request.json();
	if (data == null) {
		return json({ status: 400 });
	}
	await prisma.transaction.updateMany({
		where: {
			id: {
				in: data.map((obj: any) => parseInt(obj.id))
			}
		},
		data: {
			...data
		}
	});

	return json({ status: 204 });
}
