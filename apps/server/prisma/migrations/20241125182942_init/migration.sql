-- CreateTable
CREATE TABLE `import` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `public_architecture_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `import_public_architecture_id_user_id_key`(`public_architecture_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `private_architecture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` CHAR(50) NOT NULL,
    `author_id` INTEGER NOT NULL,
    `architecture` JSON NOT NULL,
    `cost` DOUBLE NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `public_architecture_tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `public_architecture_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,

    UNIQUE INDEX `public_architecture_tag_public_architecture_id_tag_id_key`(`public_architecture_id`, `tag_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `public_architecture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` CHAR(50) NOT NULL,
    `author_id` INTEGER NOT NULL,
    `architecture` JSON NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `cost` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `star` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `public_architecture_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `star_public_architecture_id_user_id_key`(`public_architecture_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `version` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `private_architecture_id` INTEGER NOT NULL,
    `title` CHAR(50) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `architecture` JSON NOT NULL,
    `cost` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `import` ADD CONSTRAINT `import_public_architecture_id_fkey` FOREIGN KEY (`public_architecture_id`) REFERENCES `public_architecture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `import` ADD CONSTRAINT `import_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `private_architecture` ADD CONSTRAINT `private_architecture_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `public_architecture_tag` ADD CONSTRAINT `public_architecture_tag_public_architecture_id_fkey` FOREIGN KEY (`public_architecture_id`) REFERENCES `public_architecture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `public_architecture_tag` ADD CONSTRAINT `public_architecture_tag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `public_architecture` ADD CONSTRAINT `public_architecture_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `star` ADD CONSTRAINT `star_public_architecture_id_fkey` FOREIGN KEY (`public_architecture_id`) REFERENCES `public_architecture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `star` ADD CONSTRAINT `star_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `version` ADD CONSTRAINT `version_private_architecture_id_fkey` FOREIGN KEY (`private_architecture_id`) REFERENCES `private_architecture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
