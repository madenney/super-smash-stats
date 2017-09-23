-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:1337
-- Generation Time: Sep 23, 2017 at 07:16 PM
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
-- Table structure for table `player_info`
--

CREATE TABLE `player_info` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `tag` varchar(45) NOT NULL,
  `alt_tags` varchar(500) NOT NULL,
  `location` varchar(45) NOT NULL,
  `main` varchar(45) NOT NULL,
  `secondary` varchar(45) NOT NULL,
  `twitter` varchar(45) NOT NULL,
  `image_url` varchar(1000) NOT NULL,
  `sponsor` varchar(45) NOT NULL,
  `twitch` varchar(45) NOT NULL,
  `tidbit` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `player_info`
--

INSERT INTO `player_info` (`id`, `name`, `tag`, `alt_tags`, `location`, `main`, `secondary`, `twitter`, `image_url`, `sponsor`, `twitch`, `tidbit`) VALUES
(1, 'Adam Lindgren', 'Armada', '[A]rmada', 'Sweden', 'Peach', 'Fox', 'ArmadaUGS', '', '', '', ''),
(2, 'Juan Debiedma', 'Hungrybox', '', 'Florida', 'Jigglypuff', 'Ness', 'LiquidHbox', '', '', '', ''),
(3, 'Joseph Marquez', 'Mang0', 'Mango', 'Socal', 'Fox', 'Falco', 'C9Mang0', '', '', '', ''),
(4, 'Jason Zimmerman', 'Mew2King', 'M2K', 'Florida', 'Marth', 'Sheik', 'MVG_Mew2King', '', '', '', ''),
(5, 'William Hjlete', 'Leffen', '', 'Sweden', 'Fox', '', 'TSM_Leffen', '', '', '', ''),
(6, 'Justin McGrath', 'Plup', '', 'Florida', 'Sheik', 'Fox', 'PG_Plup', '', '', '', ''),
(7, 'Zachary Cordoni', 'SFAT', '', 'Norcal', 'Fox', '', 'Sfat', '', '', '', ''),
(8, 'Weston Dennis', 'Westballz', '', 'Socal', 'Falco', 'Fox', 'G2Westballz', '', '', '', ''),
(9, 'Jeffrey Williamson', 'Axe', '', 'Arizona', 'Pikachu', '', 'TempoAxe', '', '', '', ''),
(10, 'Dajuan \'Energy\' McDaniel', 'Shroomed', '', 'Norcal', 'Sheik', 'Marth', 'Shroomed08', '', '', '', ''),
(11, 'James Liu', 'Swedish Delight', '', 'Tristate', 'Sheik', '', 'SSB_Swedish', '', '', '', ''),
(12, 'Justin Hallett', 'Wizzrobe', '', 'Florida', 'Captain Falcon', '', 'Wizzrobe', '', '', '', ''),
(13, 'Mustafa Akcakaya', 'Ice', '', 'Germany', 'Fox', '', 'LG_Ice', '', '', '', ''),
(14, 'Kevin Toy', 'PewPewU', '', 'Norcal', 'Marth', '', 'CLG_PewPewU', '', '', '', ''),
(15, 'James Ma', 'Duck', '', 'Midwest', 'Samus', '', 'SSBDuck', '', '', '', ''),
(16, 'Johnny Kim', 'S2J', '', 'Socal', 'Captain Falcon', '', 'Tempo_S2J', '', '', '', ''),
(17, 'Michael Brancato', 'Nintendude', '', 'Norcal', 'Ice Climbers', '', 'NintendudeSSB', '', '', '', ''),
(18, 'Edgard Sheleby', 'N0ne', '', 'Ontario', '', 'Ganondorf', 'N0ned', '', '', '', ''),
(19, 'Joey Aldama', 'Lucky', '', 'Socal', 'Fox', '', 'TheLegendOfLucky', '', '', '', ''),
(20, 'Otto Bisno', 'Silent Wolf', 'silentwolf', 'Pacific Northwest', 'Fox', '', 'SilentWolf444', '', '', '', ''),
(21, 'Ryan Coker-Welch', 'The Moon', 'La Luna', 'Tri-State', 'Marth', '', 'TheMoon112', '', '', '', ''),
(22, 'Daniel Rodriguez', 'Chudat', '', 'MD/VA', 'Ice Climbers', '', 'Chudatzzz', '', '', '', ''),
(23, 'Sami Muhanna', 'DruggedFox', '', 'Georgia', 'Fox', 'Falco', 'DruggedFox', '', '', '', ''),
(24, 'Aaron Thomas', 'Professor Pro', '', 'United Kingdom', 'Fox', '', 'VWS_Professor', '', '', '', ''),
(25, 'Colin Green', 'Colbol', '', 'Florida', 'Fox', 'Marth', 'Colbol725', '', '', '', ''),
(26, 'McCain Lavelle', 'MacD', '', 'Socal', 'Peach', '', 'MacDSmash', '', '', '', ''),
(27, 'Kyle Athayde', 'DizzKidBoogie', '', 'Norcal', 'Ice Climbers', '', 'DizzKidBoogie', '', '', '', ''),
(28, 'Michael Pulido', 'MikeHaze', 'Mike Haze', 'Socal', 'Fox', '', 'MikeHazeGaming', '', '', '', ''),
(29, 'David MacDonald', 'KirbyKaze', '', 'Canada', 'Sheik', '', 'KirbyKaze_', '', '', '', ''),
(30, 'Robert Wright', 'Wobbles', '', 'Texas', 'Ice Climbers', '', 'PG_Wobbles', '', '', '', ''),
(31, 'Julian Zhu', 'Zhu', '', 'Norcal', 'Falco', '', 'BOXRZhu', '', '', '', ''),
(32, 'Masaya Chikamoto', 'Amsa', '', 'Japan', 'Yoshi', '', 'AmsaRedYoshi', '', '', '', ''),
(33, 'Samuel Rohrer', 'Laudandus', '', 'Norcal', 'Sheik', '', 'Laudandus', '', '', '', ''),
(34, 'Kalindi Henderson', 'KJH', '', 'Midwest', 'Fox', '', 'Spotdodge_Shine', '', '', '', ''),
(35, 'Jason Diehl', 'Gahtzu', '', 'Florida', 'Captain Falcon', '', 'Gahtzu', '', '', '', ''),
(36, 'Kashan Khan', 'Chillindude', '', 'MD/VA', 'Fox', '', 'LiquidChillin', '', '', '', ''),
(37, 'Javier Ruiz', 'Javi', '', 'Mexico', 'Fox', '', 'Javier_Ruiz', '', '', '', ''),
(38, 'Hugo Gonzalez', 'Hugs', '', 'Socal', 'Samus', '', 'Hugs86', '', '', '', ''),
(39, 'Teddy Seybold', 'Bladewise', '', 'Pacific Northwest', 'Peach', '', 'Bladewise00', '', '', '', ''),
(40, 'Steven Abate', 'Abate', '', 'PGH/NEOH', 'Luigi', '', 'AbateSmash', '', '', '', ''),
(41, 'Dustin White', 'Gravy', '', 'Florida', 'Captain Falcon', '', 'iAreGravy', '', '', '', ''),
(42, 'Abhishek Prabhu', 'Prince Abu', 'Prince F. Abu', 'Midwest', 'Jigglypuff', '', 'ThePrinceOfSSBM', '', '', '', ''),
(43, 'Santiago Pinon', 'Santiago', 'Santi, El Fuego', 'Socal', 'Fox', 'Falco', 'SantiagoSmash', '', '', '', ''),
(44, 'Alvaro Garcia Moral', 'Trifasia', '', 'Spain', 'Peach', '', 'Trifsmash', '', '', '', ''),
(45, 'Griffin Williams', 'Captain Faceroll', '', 'Socal', 'Sheik', '', 'SSBM_Faceroll', '', '', '', ''),
(46, 'Connor Ngyuen', 'Connor', '', 'Socal', 'Fox', 'Sheik', 'TA_CDK', '', '', '', ''),
(47, 'Jason Gauthier', 'Infinite Numbers', '', 'New England', 'Ice Climbers', '', 'Numbers__SSB', '', '', '', ''),
(48, 'Ryan Ford', 'Ryan Ford', '', 'Canada', 'Fox', '', 'Ryan_Ford522', '', '', '', ''),
(49, 'Jack Hoyt', 'Crush', '', 'New England', 'Fox', '', 'FSBR_Crush', '', '', '', ''),
(50, 'James Lauerman', 'Mafia', '', 'New England', 'Peach', '', 'SSBM_Mafia', '', '', '', ''),
(51, 'Anthony Detres', 'Slox', '', 'New England', 'Fox', 'Sheik', 'Slox_', '', '', '', ''),
(52, 'Diaki Ideoka', 'Rudolph', '', 'Japan', 'Marth', 'Fox', 'Rudolph_SSBM', '', '', '', ''),
(53, 'Roberto Iglesias', 'Overtriforce', '', 'Spain', 'Sheik', '', 'Overtriforce', '', '', '', ''),
(54, 'Arjun Malhotra', 'Llod', '', 'MD/VA', 'Peach', '', 'LLod74', '', '', '', ''),
(55, 'Kelly Smith', 'Kels', '', 'Midwest', 'Fox', 'Sheik', 'SSBM_Kels', '', '', '', ''),
(56, 'Eduardo Rincon', 'Eddy Mexico', '', 'Mexico', 'Luigi', '', 'EddyMexico007', '', '', '', ''),
(57, 'Austin Demmon', 'Azusa', '', 'Norcal', 'Peach', '', 'AzusaSSBM', '', '', '', ''),
(58, 'Amsah Augustuszoon', 'Amsah', '', 'Netherlands', 'Sheik', '', 'TheRealAmsah', '', '', '', ''),
(59, 'Austin Self', 'Redd', '', 'MD/VA', 'Fox', 'Marth', 'ReddSSBM', '', '', '', ''),
(60, 'Charles Meighen', 'Cactuar', '', 'Norcal', 'Fox', 'Marth', 'CactusSmash', '', '', '', ''),
(61, 'Miguel Rodriguez Penalva', 'Zgetto', '', 'Netherlands', 'Fox', '', 'Zgetto', '', '', '', ''),
(62, 'Rishi Malhotra', 'SmashG0d', '', 'MD/VA', 'Marth', '', 'SmashG0d', '', '', '', ''),
(63, 'Andreas Lindgren', 'Android', '', 'Sweden', 'Sheik', '', 'UGS_Android', '', '', '', ''),
(64, 'Alex Cottrell', 'Captain Smuckers', 'Smuckers', 'Tri-State', 'Captain Falcon', '', 'CaptainSmuckers', '', '', '', ''),
(65, 'Hendrick Pilar', 'DJ Nintendo', '', 'New York', 'Fox', 'Pikachu', 'DJNintendo17', '', '', '', ''),
(66, 'Zain Naghmi', 'Zain', '', 'MD/VA', 'Marth', '', 'SSBMZain', '', '', '', ''),
(67, 'Justin Burroughs', 'Syrox', '', 'Colorado', 'Fox', '', 'SyroxM', '', '', '', ''),
(68, 'Eric Lew', 'ESam', '', 'Florida', 'Samus', '', 'PGEsam', '', '', '', ''),
(69, 'Jeremy Deustch', 'Squid', '', 'Socal', 'Falco', '', 'SquidsLaugh', '', '', '', ''),
(70, 'Roustane Benzeguir', 'Kage the Warrior', 'Kage', 'Quebec', 'Ganondorf', '', 'KageTheWarrior', '', '', '', ''),
(71, 'Kyle Zhu', 'Kalamazhu', '', 'Norcal', 'Peach', '', 'MW_Buster', '', '', '', ''),
(72, 'Binyan Lin', 'DarkAtma', '', 'Norcal', 'Sheik', 'Peach', 'DarkAtma', '', '', '', ''),
(73, 'Oscar Nilsson', 'Lovage', '', 'Socal', 'Fox', '', 'Lovage805', '', '', '', ''),
(74, 'Andrew Vo', 'Tai', '', 'Arizona', 'Marth', '', 'TeeAyEye', '', '', '', ''),
(75, 'Drew Scoles', 'Drephen', '', 'Midwest', 'Sheik', '', 'Drephen', '', '', '', ''),
(76, 'Ammon Styles', 'Ka-Master', 'Luigi Ka-Master', 'Utah', 'Luigi', '', 'Luigi_KaMaster', '', '', '', ''),
(77, 'William Truong', 'Trulliam', '', 'Ontario', 'Falco', '', 'Trulliam', '', '', '', ''),
(78, 'Frank Borden', 'Frootloop', '', 'Norcal', 'Falco', 'Sheik', '', '', '', '', ''),
(79, 'Alex Ruvalcaba', 'Alex19', '', 'Socal', 'Fox', '', 'Mach1Alex19', '', '', '', ''),
(80, 'Brandon Collier', 'HomeMadeWaffles', 'HMW', 'Norcal', 'Fox', 'Falco', 'YungWaff', '', '', '', ''),
(81, 'Cory Hong', 'Milkman', '', 'MD/VA', 'Fox', '', 'Milkman_SSBM', '', '', '', ''),
(82, 'Austin Conley', 'ARC', '', 'Texas', 'Marth', '', 'ARCSGotGame', '', '', '', ''),
(83, 'Will Hsiao', 'Reno', '', 'Socal', 'Sheik', 'Fox', 'RenoNY', '', '', '', ''),
(84, 'Daniel Lee', 'Tafokints', 'Tafo', 'Socal', 'Sheik', '', 'Tafokints', '', '', '', ''),
(85, 'Charles Kimmelman', 'Fuzzyness', '', 'United Kingdom', 'Fox', 'Captain Falcon', 'Fuzzyness', '', '', '', ''),
(86, 'David Kim', 'Kira', '', 'Socal', 'Fox', '', 'SSBM_Kira', '', '', '', ''),
(87, 'Ken Hoang', 'Ken', '', 'Socal', 'Marth', '', 'LiquidKen', '', '', '', ''),
(88, 'Oscar Malherbe', 'Mojo', '', 'Texas', 'Fox', '', 'aHotCupOfMojo', '', '', '', ''),
(89, 'Juan Garcia', 'Medz', '', 'Arizona', 'Fox', 'Marth', 'RG_Medz', '', '', '', ''),
(90, 'Alex Shnayder', 'Zanguzen', '', 'Tri-State', 'Falco', '', 'Zanguzen', '', '', '', ''),
(91, 'Phil DeBerry', 'Phil', '', 'Norcal', 'Fox', '', 'DoYouPhilsMe', '', '', '', ''),
(92, 'DarrellWhite', 'Darrell', '', 'Norcal', 'Samus', '', 'DarrellSamus', '', '', '', ''),
(93, 'Nicholas Whittier', 'NMW', '', 'Norcal', 'Captain Falcon', '', 'NMWHittier', '', '', '', ''),
(94, 'Clay Moulton', 'Porkchops', '', 'Florida', 'Falco', '', 'VSPorkchops', '', '', '', ''),
(95, 'Jacob Pinto', 'JFlex', '', 'Tri-State', 'Sheik', 'Fox', '', '', '', '', ''),
(96, 'Robby Gee', 'Vanity Angel', '', 'United Kingdom', 'Peach', '', 'VanityAngelSSBM', '', '', '', ''),
(97, 'Mike Scaturchio', '$Mike', '', 'North Carolina', 'Captain Falcon', '', 'FSBRMoneyMike', '', '', '', ''),
(98, 'Vikram Bassi', 'Nightmare', '', 'Ontario', 'Marth', '', 'Nightmare6God', '', '', '', ''),
(99, 'David Long', '4%', '', 'NEOH', 'Jigglypuff', '', '4PercentGaming', '', '', '', ''),
(100, 'Jay Dahya', 'Drunk Sloth', 'Drunksloth', 'Florida', 'Ice Climbers', '', 'DrvnkSloth', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `player_info`
--
ALTER TABLE `player_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `player_info`
--
ALTER TABLE `player_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
