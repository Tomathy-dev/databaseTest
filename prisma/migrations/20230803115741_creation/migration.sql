-- CreateTable
CREATE TABLE `File` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phoneNumber` INTEGER NULL,
    `personal` BOOLEAN NOT NULL,
    `matter_final` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matter` (
    `fileId` INTEGER NOT NULL,
    `matter` INTEGER NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `inCharge` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`fileId`, `matter`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file` INTEGER NOT NULL,
    `matter` INTEGER NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `transactionMethod` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `creditValue` DOUBLE NULL,
    `debitValue` DOUBLE NULL,
    `bank` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ledger` (
    `cardNumber` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `totalValue` DOUBLE NOT NULL,

    UNIQUE INDEX `Ledger_name_key`(`name`),
    PRIMARY KEY (`cardNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Matter` ADD CONSTRAINT `Matter_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_file_matter_fkey` FOREIGN KEY (`file`, `matter`) REFERENCES `Matter`(`fileId`, `matter`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_bank_fkey` FOREIGN KEY (`bank`) REFERENCES `Ledger`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
