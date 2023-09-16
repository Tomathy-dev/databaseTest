import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const users: Prisma.FileCreateInput[] = [];
const trans: Prisma.TransactionCreateInput[] = [];

let gamer: Prisma.FileCreateInput;
let transac: Prisma.TransactionCreateInput;
const options = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error'];

async function main() {
	for (let i = 0; i < 100; i++) {
		const matters: any[]= [];
		for(let j = 0; j < faker.number.int({ min: 1, max: 5 }); j++) {
			matters.push({
				matter: j + 1,
				department: faker.commerce.department(),
				inCharge: faker.person.firstName(),
				openDate: faker.date.between({
					from: '2017-01-01T00:00:00.000Z',
					to: '2023-07-31T00:00:00.000Z'
				}),
			});
		}
		gamer = {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			personal: Math.random() < 0.5,
			openDate: faker.date.between({
				from: '2017-01-01T00:00:00.000Z',
				to: '2023-07-31T00:00:00.000Z'
			}),
			matters: {
				create: matters
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

	const addedLedgers: Prisma.LedgerCreateInput[] = [
		{
			cardNumber: '1234567890123456',
			name: 'Caixa Geral de Depósitos'
		},
		{
			cardNumber: '1234567890123457',
			name: 'Novo Banco'
		}
	];
	await Promise.all(
		addedLedgers.map(async (ledger) => {
			await prisma.ledger.create({
				data: ledger
			});
		})
	);

	for (let i = 0; i < 100; i++) {
		const random = faker.number.int({ min: 0, max: 100 });
		let color = '';
		if (random > 60) {
			color = options[Math.floor(Math.random() * options.length)];
		}
		const file_number = faker.number.int({ min: 1, max: 100 });
		const number_matters = await prisma.file.findUnique({
			 where: { id: file_number },
			 include:{
				matters: true
			}
		});
		console.log(number_matters);
		transac = {
			matterRelation: {
				connect: {
					fileId_matter: {
						fileId: file_number,
						matter: faker.number.int({ min: 1, max: number_matters?.matters.length })
					}
				}
			},
			date: faker.date.between({
				from: '2017-01-01T00:00:00.000Z',
				to: '2023-07-31T00:00:00.000Z'
			}),
			description: faker.finance.transactionDescription(),
			value: faker.number.bigInt({ min: -50000000n, max: 50000000n }),
			Ledger: {
				connect: { cardNumber: '1234567890123456' }
			},
			transactionMethod: faker.finance.transactionType(),
			color: color
		};
		trans.push(transac);
	}

	for (const u of trans) {
		const ledger = await prisma.ledger.findUnique({
			where: {
				cardNumber: '1234567890123456'
			},
			select: {
				totalValue: true
			}
		});
		if (!ledger) throw new Error('Ledger not found');
		const t = await prisma.$transaction([
			prisma.transaction.create({
				data: u
			}),
			prisma.ledger.update({
				where: {
					name: 'Caixa Geral de Depósitos'
				},
				data: {
					totalValue: ledger.totalValue + BigInt(u.value)
				}
			})
		]);
	}

	trans.length = 0;

	for (let i = 0; i < 100; i++) {
		const random = faker.number.int({ min: 0, max: 100 });
		let color = '';
		if (random > 60) {
			color = options[Math.floor(Math.random() * options.length)];
		}
		const file_number = faker.number.int({ min: 1, max: 100 });
		const number_matters = await prisma.file.findUnique({ where: { id: file_number }, include:{matters: true}});
		transac = {
			matterRelation: {
				connect: {
					fileId_matter: {
						fileId: file_number,
						matter: faker.number.int({ min: 1, max: number_matters?.matters.length	})
					}
				}
			},
			date: faker.date.between({
				from: '2017-01-01T00:00:00.000Z',
				to: '2023-07-31T00:00:00.000Z'
			}),
			description: faker.finance.transactionDescription(),
			value: faker.number.bigInt({ min: -50000000n, max: 50000000n }),
			Ledger: {
				connect: { cardNumber: '1234567890123457' }
			},
			transactionMethod: faker.finance.transactionType(),
			color: color
		};
		trans.push(transac);
	}

	for (const u of trans) {
		const ledger = await prisma.ledger.findUnique({
			where: {
				cardNumber: '1234567890123457'
			},
			select: {
				totalValue: true
			}
		});
		if (!ledger) throw new Error('Ledger not found');
		const t = await prisma.$transaction([
			prisma.transaction.create({
				data: u
			}),
			prisma.ledger.update({
				where: {
					name: 'Novo Banco'
				},
				data: {
					totalValue: ledger.totalValue + BigInt(u.value)
				}
			})
		]);
	}
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
