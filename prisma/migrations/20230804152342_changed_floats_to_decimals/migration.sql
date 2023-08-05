-- AlterTable
ALTER TABLE `ledger` MODIFY `totalValue` DECIMAL(11, 2) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `value` DECIMAL(11, 2) NOT NULL;
