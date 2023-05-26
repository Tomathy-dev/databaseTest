import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const users: Prisma.FileCreateInput[] = [];

let gamer: Prisma.FileCreateInput;

async function main() {
	for (let i = 0; i < 100; i++) {
		gamer = {
			name: faker.name.fullName(),
			email: faker.internet.email(),
			personal: Math.random() < 0.5,
			matters: {
				create: [
					{
						matter: 1,
						department: faker.commerce.department(),
						inCharge: faker.name.firstName()
					},
					{
						matter: 2,
						department: faker.commerce.department(),
						inCharge: faker.name.firstName()
					}
				]
			}
		};
		users.push(gamer);
	}

	for (const u of users) {
		const file = await prisma.file.create({
			data: u
		});
		console.log(file);
	}

	await prisma.ledger.create({
		data: {
			cardNumber: '1234567890123456',
			name: 'Caixa Geral de depósitos',
			totalValue: 1000000
		}
	});

	await prisma.transaction.create({
		data: {
			matterRelation: {
				connect: {
					fileId_matter: {
						fileId: 1,
						matter: 1
					}
				}
			},
			date: '2023-05-25',
			description: 'Teste',
			creditValue: 1000,
			Ledger: {
				connect: { cardNumber: '1234567890123456' }
			},
			transactionMethod: 'CASH'
		}
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.log(e);
		await prisma.$disconnect();
		process.exit(1);
	});
