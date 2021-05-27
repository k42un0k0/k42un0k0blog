CREATE TABLE `user_daos` (
    `id` bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `created_at` datetime(3) DEFAULT NULL,
    `updated_at` datetime(3) DEFAULT NULL,
    `deleted_at` datetime(3) DEFAULT NULL,
    `name` longtext,
    `email` varchar(191) NOT NULL,
    `password` longtext NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
ALTER TABLE `user_daos`
ADD UNIQUE KEY `email` (`email`),
    ADD KEY `idx_user_daos_deleted_at` (`deleted_at`);