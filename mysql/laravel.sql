-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2023 at 10:45 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `specialty` varchar(255) NOT NULL,
  `fb` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `name`, `tel`, `specialty`, `fb`, `website`, `created_at`, `updated_at`) VALUES
(1, 'Esperanza Mann', '207.616.7198', 'Ενδοκρινολόγος', 'http://www.kuhlman.com/', 'http://www.murray.com', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(2, 'Lessie Schmitt', '986-769-3953', 'Γυναικολόγος', 'http://www.pfeffer.com/sapiente-tenetur-suscipit-dignissimos-occaecati-ab', 'http://www.larson.org', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(3, 'Lucienne Towne', '+1 (470) 619-0989', 'Χειρούργος', 'http://www.buckridge.info/', 'http://www.feil.com', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(4, 'Benjamin Glover MD', '(816) 905-3084', 'Παθολόγος', 'http://www.greenholt.org/quis-cumque-laboriosam-dicta-cumque', 'http://www.cronin.info', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(5, 'Alaina D\'Amore', '678-457-6511', 'Ψυχίατρος', 'https://www.jerde.com/molestias-fugit-quia-ut-nisi', 'http://www.satterfield.biz', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(6, 'Alia Goodwin Jr.', '626.357.5240', 'Καρδιολόγος', 'http://www.wyman.biz/ullam-deserunt-quas-veniam', 'http://www.mitchell.com', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(7, 'Fredrick Connelly', '1-248-840-7113', 'Οδοντίατρος', 'http://www.konopelski.com/', 'http://www.larson.com', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(8, 'Serena Harris II', '283.568.0432', 'Νευρολόγος', 'http://hansen.net/similique-sequi-sed-impedit-sit-harum.html', 'http://www.mueller.com', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(9, 'Santa Ziemann', '843.507.4419', 'Παιδίατρος', 'http://www.bogisich.biz/omnis-natus-tenetur-autem-odio-corporis-est-minus-dolor', 'http://www.daugherty.com', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(10, 'Prof. Josue Carter', '+1 (217) 430-1144', 'Οφθαλμίατρος', 'http://herman.com/sapiente-illo-ex-cum-pariatur-officia-ratione-quia.html', 'http://www.kling.info', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(12, 'John Doe', '1010101010', 'Δερματολόγος', 'http://www.fb.info/', 'http://www.johndoe.com', '2023-03-05 05:05:31', '2023-03-05 05:06:39');

-- --------------------------------------------------------

--
-- Table structure for table `doctors_patients`
--

CREATE TABLE `doctors_patients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `doctors_id` bigint(20) UNSIGNED NOT NULL,
  `patients_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `doctors_patients`
--

INSERT INTO `doctors_patients` (`id`, `doctors_id`, `patients_id`) VALUES
(1, 1, 8),
(2, 2, 2),
(3, 3, 4),
(4, 4, 3),
(5, 5, 2),
(6, 6, 5),
(7, 7, 3),
(8, 8, 9),
(9, 9, 7),
(10, 10, 3),
(44, 2, 5),
(48, 12, 5),
(49, 12, 2),
(50, 10, 1),
(51, 10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `name`, `tel`, `age`, `gender`, `created_at`, `updated_at`) VALUES
(1, 'Erling Goldner', '1-959-531-1896', 92, 'Άνδρας', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(2, 'Stone Reinger', '586.978.9402', 44, 'Άνδρας', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(3, 'Prof. Liam Schmitt V', '+1-978-313-9283', 4, 'Άνδρας', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(4, 'Myrtle Satterfield', '571-641-8633', 55, 'Γυναίκα', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(5, 'Oceane Greenholt', '248.756.9773', 70, 'Γυναίκα', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(6, 'Prof. Braeden Ondricka', '727-303-7121', 79, 'Άνδρας', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(7, 'Olen Medhurst', '479-492-3591', 71, 'Γυναίκα', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(8, 'Carole Luettgen', '+1-352-487-1459', 41, 'Γυναίκα', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(9, 'Prof. Eusebio Windler', '+1 (765) 398-6635', 70, 'Άνδρας', '2023-02-28 11:36:36', '2023-02-28 11:36:36'),
(10, 'Leann Wolf', '+1-612-209-8032', 15, 'Γυναίκα', '2023-02-28 11:36:36', '2023-02-28 11:36:36');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors_patients`
--
ALTER TABLE `doctors_patients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctors_patients_doctors_id_foreign` (`doctors_id`),
  ADD KEY `doctors_patients_patients_id_foreign` (`patients_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `doctors_patients`
--
ALTER TABLE `doctors_patients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `doctors_patients`
--
ALTER TABLE `doctors_patients`
  ADD CONSTRAINT `doctors_patients_doctors_id_foreign` FOREIGN KEY (`doctors_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `doctors_patients_patients_id_foreign` FOREIGN KEY (`patients_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
