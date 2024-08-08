-- DropForeignKey
ALTER TABLE `baseingredient` DROP FOREIGN KEY `BaseIngredient_menuItemId_fkey`;

-- DropForeignKey
ALTER TABLE `ingredient` DROP FOREIGN KEY `Ingredient_menuItemId_fkey`;

-- DropForeignKey
ALTER TABLE `size` DROP FOREIGN KEY `Size_menuItemId_fkey`;

-- AddForeignKey
ALTER TABLE `Ingredient` ADD CONSTRAINT `Ingredient_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `MenuItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Size` ADD CONSTRAINT `Size_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `MenuItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BaseIngredient` ADD CONSTRAINT `BaseIngredient_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `MenuItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
