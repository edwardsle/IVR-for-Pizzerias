-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2021 at 05:17 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs597`
--

-- --------------------------------------------------------

--
-- Table structure for table `credentials`
--

CREATE TABLE `credentials` (
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `name` varchar(225) NOT NULL,
  `role` int(6) NOT NULL,
  `ip` varchar(225) NOT NULL,
  `token` varchar(225) DEFAULT NULL,
  `expires` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `credentials`
--

INSERT INTO `credentials` (`email`, `password`, `name`, `role`, `ip`, `token`, `expires`, `created_at`) VALUES
('admin@cs597.com', '@123Abc', 'Ed Le', 1, '', NULL, '2021-09-28 07:37:49', '2021-09-28 07:37:49'),
('alextran9613@gmail.com', '$2y$10$804YMoWTZH20G7w9skB0QOEb5/Z/A3Cr5XdqRFkMmQGvR2dzidIUa', 'Alex Tran', 0, '', NULL, '2021-11-14 19:29:54', '2021-11-14 19:29:54');

-- --------------------------------------------------------

--
-- Table structure for table `crusts`
--

CREATE TABLE `crusts` (
  `id` int(11) NOT NULL,
  `name` varchar(225) COLLATE utf8_unicode_ci NOT NULL,
  `price` double(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `crusts`
--

INSERT INTO `crusts` (`id`, `name`, `price`) VALUES
(1, 'regular', 0.00),
(2, 'thin', 2.50);

-- --------------------------------------------------------

--
-- Table structure for table `hours`
--

CREATE TABLE `hours` (
  `id` int(11) NOT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `day` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `timein` varchar(225) COLLATE utf8_unicode_ci NOT NULL,
  `timeout` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hours`
--

INSERT INTO `hours` (`id`, `status`, `day`, `timein`, `timeout`) VALUES
(1, 'unknown', 'mon', '09:00', '17:01'),
(2, 'unknown', 'tue', '09:02', '17:02'),
(3, 'unknown', 'wed', '09:03', '17:03'),
(4, 'unknown', 'thu', '09:04', '17:04'),
(5, 'unknown', 'fri', '09:05', '17:05'),
(6, 'unknown', 'sat', '09:06', '17:06'),
(7, 'unknown', 'sun', '09:07', '17:07');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `status` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'new',
  `source` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ispaid` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `status`, `source`, `phone`, `ispaid`, `created`) VALUES
(12, 'prepare', 'online', '7145894027', 'null', '2021-11-21 02:02:12'),
(13, 'ready', 'online', '7145894027', 'null', '2021-12-07 03:43:10'),
(14, 'prepare', 'online', '7145894027', 'null', '2021-12-07 03:43:31'),
(15, 'prepare', 'online', '7145894027', 'null', '2021-12-07 03:43:50');

-- --------------------------------------------------------

--
-- Table structure for table `pizzas`
--

CREATE TABLE `pizzas` (
  `id` int(255) NOT NULL,
  `orderid` int(255) NOT NULL,
  `status` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `crust` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `sauce` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `toppings` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `pizzas`
--

INSERT INTO `pizzas` (`id`, `orderid`, `status`, `crust`, `size`, `sauce`, `toppings`) VALUES
(21, 12, 'prepare', 'thin', 'medium', 'bbq', 'jalapeno, mushroom, black-olives, pineapple, '),
(22, 13, 'prepare', 'thin', 'medium', 'bbq', 'pepperoni, beef, mushroom, black-olives, '),
(23, 13, 'prepare', 'thin', 'large', 'alfredo', 'ham, chicken, jalapeno, mushroom, '),
(24, 13, 'prepare', 'regular', 'medium', 'regular', 'pepperoni, ham, chicken, mushroom, black-olives, '),
(25, 14, 'prepare', 'thin', 'medium', 'bbq', 'beef, ham, chicken, jalapeno, mushroom, pineapple, '),
(26, 15, 'prepare', 'regular', 'small', 'regular', 'pepperoni, beef, jalapeno, mushroom, '),
(27, 15, 'prepare', 'thin', 'medium', 'bbq', 'pepperoni, beef, ham, chicken, jalapeno, mushroom, black-olives, pineapple, ');

-- --------------------------------------------------------

--
-- Table structure for table `sauces`
--

CREATE TABLE `sauces` (
  `id` int(11) NOT NULL,
  `name` varchar(225) COLLATE utf8_unicode_ci NOT NULL,
  `price` double(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sauces`
--

INSERT INTO `sauces` (`id`, `name`, `price`) VALUES
(1, 'Regular Sauce', 0.00),
(2, 'BBQ Sauce', 1.00),
(3, 'Alfredo Sauce', 1.30);

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `name` varchar(225) COLLATE utf8_unicode_ci NOT NULL,
  `price` double(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `name`, `price`) VALUES
(1, 'small', 2.00),
(2, 'medium', 4.00),
(3, 'large', 6.00);

-- --------------------------------------------------------

--
-- Table structure for table `toppings`
--

CREATE TABLE `toppings` (
  `id` int(11) NOT NULL,
  `type` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(225) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `toppings`
--

INSERT INTO `toppings` (`id`, `type`, `name`, `price`) VALUES
(1, 'meat', 'pepperoni', '0.20'),
(2, 'meat', 'beef', '0.20'),
(3, 'meat', 'ham', '0.20'),
(4, 'meat', 'chicken', '0.20'),
(5, 'vegie', 'jalapeno peppers', '0.20'),
(6, 'vegie', 'mushroom', '0.20'),
(7, 'vegie', 'black olives', '0.20'),
(8, 'vegie', 'pineapple', '0.20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crusts`
--
ALTER TABLE `crusts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hours`
--
ALTER TABLE `hours`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pizzas`
--
ALTER TABLE `pizzas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sauces`
--
ALTER TABLE `sauces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `toppings`
--
ALTER TABLE `toppings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crusts`
--
ALTER TABLE `crusts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hours`
--
ALTER TABLE `hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `sauces`
--
ALTER TABLE `sauces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `toppings`
--
ALTER TABLE `toppings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
