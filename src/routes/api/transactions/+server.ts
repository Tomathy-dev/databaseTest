import { prisma } from '$lib/server/prisma';
import type { RequestEvent } from './$types';

export async function POST(event: RequestEvent) {
	const data = await event.request.json();
	const createArray = [];
	for (let i = 0; i < data.created.length; i++) {
		createArray.push(
			prisma.transaction.create({
				data: {
					matterRelation: {
						connect: {
							fileId_matter: {
								fileId: parseInt(data.created[i].file),
								matter: parseInt(data.created[i].matter)
							}
						}
					},
					date: data.created[i].date,
					description: data.created[i].description,
					debitValue: data.created[i].debitValue,
					creditValue: data.created[i].creditValue,
					Ledger: {
						connect: { cardNumber: '1234567890123456' }
					},
					transactionMethod: data.created[i].transactionMethod
				}
			})
		);
	}
	const updateArray = [];
	console.log(data.changed);
	for (let i = 0; i < data.changed.length; i++) {
		updateArray.push(
			prisma.transaction.update({
				where: {
					id: data.changed[i].id
				},
				data: {
					matterRelation: {
						connect: {
							fileId_matter: {
								fileId: data.changed[i].file,
								matter: data.changed[i].matter
							}
						}
					},
					date: data.changed[i].date,
					description: data.changed[i].description,
					debitValue: data.changed[i].debitValue,
					creditValue: data.changed[i].creditValue,
					Ledger: {
						connect: { cardNumber: '1234567890123456' }
					},
					transactionMethod: data.changed[i].transactionMethod
				}
			})
		);
	}
	if (updateArray.length === 0) await prisma.$transaction(createArray);
	else if (createArray.length === 0) await prisma.$transaction(updateArray);
	else await prisma.$transaction([...createArray, ...updateArray]);
	return new Response('hello there');
}
