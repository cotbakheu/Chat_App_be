-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2021 at 03:34 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `user_id`, `target_id`, `message`, `created_at`) VALUES
(222, 14, 13, 'Halo', '2021-03-16 00:53:43'),
(223, 13, 14, 'Hai', '2021-03-16 00:53:53'),
(224, 13, 15, 'halo', '2021-03-16 01:40:55'),
(225, 13, 14, 'halo bro', '2021-03-16 02:03:17'),
(226, 14, 13, 'halo bro', '2021-03-16 02:03:38');

-- --------------------------------------------------------

--
-- Table structure for table `friend`
--

CREATE TABLE `friend` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL COMMENT '0=not friend, 1== friend'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friend`
--

INSERT INTO `friend` (`id`, `user_id`, `target_id`, `status`) VALUES
(1, 13, 14, 1),
(2, 13, 15, 1),
(3, 14, 13, 1),
(4, 14, 15, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `bio` varchar(100) DEFAULT 'Hello I''m using OnTalk',
  `image` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `lat` varchar(100) DEFAULT NULL,
  `lng` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `room_id`, `email`, `password`, `username`, `name`, `bio`, `image`, `phone`, `lat`, `lng`) VALUES
(13, 266, 'user@gmail.com', '$2b$10$UFhp0APlApgOK7kHAyh/besMGl/zNrvVhyXsRVbfd18Fw69vUNt6a', 'user', 'namauser', 'i love myself', '1615860267887.png', '+62', '0', '0'),
(14, 5629, 'user1@gmail.com', '$2b$10$c79q.wte6NRS/MH5R5QWpuqBWBV3jwgApoDVy2XTLD7qcbdP59OMa', 'user1', 'user1', 'Hello I\'m using OnTalk', 'default_photo.png', '+62', '-6.175175158426828', '106.6788734408048'),
(15, 7718, 'user2@gmail.com', '$2b$10$Oc7MSkHGAp.4/zvT0p9SF.6KwTZagaTiSBkh3sH4Q.WQTdtSbDzgi', 'user2', 'user2', 'Hello I\'m using OnTalk', 'default_photo.png', '+62', '-6.175175158426828', '106.6788734408048'),
(16, 6196, 'user3@gmail.com', '$2b$10$vo0j9DfOVaTsDyAgxjAr6ehQbudCiGwJS9w5a9CwmiBsve2gk.2k2', 'user3', 'user3', 'Hello I\'m using OnTalk', 'default_photo.png', '+62', '-6.175175158426828', '106.6788734408048'),
(17, 4775, 'user4@gmail.com', '$2b$10$vy5IxrxSnQA513exsUFFIOvmjfTQbpvArzQJaoSknsAEwF9ccj.2.', 'user4', 'user4', 'Hello I\'m using OnTalk', 'default_photo.png', '+62', '-6.175175158426828', '106.6788734408048');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=227;

--
-- AUTO_INCREMENT for table `friend`
--
ALTER TABLE `friend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
