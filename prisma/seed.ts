import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const users: Prisma.FileCreateInput[] = [];
const trans: Prisma.TransactionCreateInput[] = [];

let gamer: Prisma.FileCreateInput;
let transac: Prisma.TransactionCreateInput;
const options = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error'];

async function main() {
	for (let i = 0; i < 1000; i++) {
		gamer = {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			personal: Math.random() < 0.5,
			matters: {
				create: [
					{
						matter: 1,
						department: faker.commerce.department(),
						inCharge: faker.person.firstName()
					},
					{
						matter: 2,
						department: faker.commerce.department(),
						inCharge: faker.person.firstName()
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

	const addedLedgers: Prisma.LedgerCreateInput[] = [
		{
			cardNumber: '1234567890123456',
			name: 'Caixa Geral de Depósitos',
			totalValue: 0
		},
		{
			cardNumber: '1234567890123457',
			name: 'Novo Banco',
			totalValue: 0
		}
	];
	await Promise.all(
		addedLedgers.map(async (ledger) => {
			await prisma.ledger.create({
				data: ledger
			});
		})
	);

	for (let i = 0; i < 500; i++) {
		const random = faker.number.int({ min: 0, max: 100 });
		let color = '';
		if (random > 60) {
			color = options[Math.floor(Math.random() * options.length)];
		}
		transac = {
			matterRelation: {
				connect: {
					fileId_matter: {
						fileId: faker.number.int({ min: 1, max: 1000 }),
						matter: faker.number.int({ min: 1, max: 2 })
					}
				}
			},
			date: faker.date.between({from: '2017-01-01T00:00:00.000Z', to: "2023-07-31T00:00:00.000Z"}),
			description: faker.finance.transactionDescription(),
			value: faker.number.float({ min: -100000, max: 100000, precision: 0.01 }),
			Ledger: {
				connect: { cardNumber: '1234567890123456' }
			},
			transactionMethod: faker.finance.transactionType(),
			color: color
		};
		trans.push(transac);
	}

	for (const u of trans) {
		const t = await prisma.$transaction(
			[
				prisma.transaction.create({
					data: u
				}),
				prisma.ledger.update({
					where: {
						name: 'Caixa Geral de Depósitos'
					},
					data: {
						totalValue: {
							increment: u.value
						}
					}
				})
			]
		)
		console.log(t);
	}

	trans.length = 0;

	for (let i = 0; i < 500; i++) {
		transac = {
			matterRelation: {
				connect: {
					fileId_matter: {
						fileId: faker.number.int({ min: 1, max: 1000 }),
						matter: faker.number.int({ min: 1, max: 2 })
					}
				}
			},
			date: faker.date.between({from: '2017-01-01T00:00:00.000Z', to: "2023-07-31T00:00:00.000Z"}),
			description: faker.finance.transactionDescription(),
			value: faker.number.float({ min: -100000, max: 100000, precision: 0.01 }),
			Ledger: {
				connect: { cardNumber: '1234567890123457' }
			},
			transactionMethod: faker.finance.transactionType()
		};
		trans.push(transac);
	}

	for (const u of trans) {
		const t = await prisma.$transaction(
			[
				prisma.transaction.create({
					data: u
				}),
				prisma.ledger.update({
					where: {
						name: 'Novo Banco'
					},
					data: {
						totalValue: {
							increment: u.value
						}
					}
				})
			]
		)
		console.log(t);
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
