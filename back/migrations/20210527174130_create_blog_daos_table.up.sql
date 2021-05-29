CREATE TABLE `blog_daos` (
    `id` bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `created_at` datetime(3) DEFAULT NULL,
    `updated_at` datetime(3) DEFAULT NULL,
    `deleted_at` datetime(3) DEFAULT NULL,
    `title` longtext,
    `body` longtext,
    `blog_type` bigint(20) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
ALTER TABLE `blog_daos`
ADD KEY `idx_blog_daos_deleted_at` (`deleted_at`);