/**
 * Transaction type for creating object to be sent to server for update
 */
export type TempTransaction = {
	id: number | null;
	file: number | null;
	matter: number | null;
	date: string;
	transactionMethod: string;
	description: string;
	debitValue: number | null;
	creditValue: number | null;
};
