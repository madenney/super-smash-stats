-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:1337
-- Generation Time: Aug 01, 2017 at 12:31 AM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smashstats`
--

-- --------------------------------------------------------

--
-- Table structure for table `dummy-matches`
--

CREATE TABLE `dummy-matches` (
  `id` int(11) NOT NULL,
  `winner` varchar(50) NOT NULL,
  `loser` varchar(50) NOT NULL,
  `score` varchar(5) NOT NULL,
  `tournament` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `winner` varchar(255) NOT NULL,
  `loser` varchar(255) NOT NULL,
  `score` varchar(5) NOT NULL,
  `tournament` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `tag` varchar(50) NOT NULL,
  `rank` int(11) NOT NULL,
  `location` varchar(100) NOT NULL,
  `total_matches_played` int(11) DEFAULT NULL,
  `games_vs_sub100` int(11) DEFAULT NULL,
  `wins_vs_sub100` int(11) DEFAULT NULL,
  `games_vs_25-100` int(11) DEFAULT NULL,
  `wins_vs_25-100` int(11) DEFAULT NULL,
  `games_vs_6-25` int(11) DEFAULT NULL,
  `wins_vs_6-25` int(11) DEFAULT NULL,
  `games_vs_top5` int(11) DEFAULT NULL,
  `wins_vs_top5` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `player_info`
--

CREATE TABLE `player_info` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `tag` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `main` varchar(45) NOT NULL,
  `secondary` varchar(45) NOT NULL,
  `twitter` varchar(45) NOT NULL,
  `image_url` varchar(1000) NOT NULL,
  `sponsor` varchar(45) NOT NULL,
  `twitch` varchar(45) NOT NULL,
  `tidbit` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tournaments`
--

CREATE TABLE `tournaments` (
  `id` int(11) NOT NULL,
  `date` varchar(14) NOT NULL,
  `name` varchar(250) NOT NULL,
  `entrants` int(11) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `region` varchar(50) NOT NULL,
  `winner` varchar(50) NOT NULL,
  `bracket_link` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dummy-matches`
--
ALTER TABLE `dummy-matches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `player_info`
--
ALTER TABLE `player_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tournaments`
--
ALTER TABLE `tournaments`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dummy-matches`
--
ALTER TABLE `dummy-matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100439;
--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17414;
--
-- AUTO_INCREMENT for table `player_info`
--
ALTER TABLE `player_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT for table `tournaments`
--
ALTER TABLE `tournaments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=259;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
