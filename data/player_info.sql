-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 19, 2017 at 12:23 AM
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

INSERT INTO `player_info` (`id`, `name`, `tag`, `location`, `main`, `secondary`, `twitter`, `image_url`, `sponsor`, `twitch`, `tidbit`) VALUES
(1, 'Adam Lindgren', 'Armada', 'Sweden', 'Peach', 'Fox', 'ArmadaUGS', '', 'Alliance', 'armadaugs', ''),
(2, 'Juan Debiedma', 'Hungrybox', 'Florida', 'Jigglypuff', 'Ness', 'LiquidHbox', '', 'Liquid', 'hungrybox', ''),
(3, 'Joseph Marquez', 'Mang0', 'Socal', 'Fox', 'Falco', 'C9Mang0', '', 'Cloud9', 'mang0', ''),
(4, 'Jason Zimmerman', 'Mew2King', 'Florida', 'Marth', 'Sheik', 'MVG_Mew2King', '', 'Echo Fox', 'mew2king', ''),
(5, 'William Hjlete', 'Leffen', 'Sweden', 'Fox', '', 'TSM_Leffen', '', 'TeamSoloMid', 'lffn', ''),
(6, 'Justin McGrath', 'Plup', 'Florida', 'Sheik', 'Fox', 'PG_Plup', '', 'Panda Global', 'plups', ''),
(7, 'Zachary Cordoni', 'SFAT', 'Norcal', 'Fox', '', 'Sfat', '', 'Counter Logic Gaming', 'sfat17', ''),
(8, 'Weston Dennis', 'Westballz', 'Socal', 'Falco', 'Fox', 'G2Westballz', '', 'Tempo Storm', 'westballz', ''),
(9, 'Jeffrey Williamson', 'Axe', 'Arizona', 'Pikachu', '', 'TempoAxe', '', 'Tempo Storm', 'az#_axe', ''),
(10, 'Dajuan \'Energy\' McDaniel', 'Shroomed', 'Norcal', 'Sheik', 'Marth', 'Shroomed08', '', 'Immortals', 'shroomed', ''),
(11, 'James Liu', 'Swedish Delight', 'Tristate', 'Sheik', '', 'SSB_Swedish', '', 'Renegades', 'ssb#_swedish', ''),
(12, 'Justin Hallett', 'Wizzrobe', 'Florida', 'Captain Falcon', '', 'Wizzrobe', '', '', 'wizzzrobe', ''),
(13, 'Mustafa Akcakaya', 'Ice', 'Germany', 'Fox', '', 'LG_Ice', '', 'Luminosity Gaming', '', ''),
(14, 'Kevin Toy', 'PewPewU', 'Norcal', 'Marth', '', 'CLG_PewPewU', '', 'CounterLogicGaming', 'pewpewu', ''),
(15, 'James Ma', 'Duck', 'Midwest', 'Samus', '', 'SSBDuck', '', 'Phoenix1', 'ssbduck', ''),
(16, 'Johnny Kim', 'S2J', 'Socal', 'Captain Falcon', '', 'Tempo_S2J', '', 'Tempo Storm', 's2jfalcon', ''),
(17, 'Michael Brancato', 'Nintendude', 'Norcal', 'Ice Climbers', '', 'NintendudeSSB', '', 'Splyce', 'nintendudessb', ''),
(18, 'Edgard Sheleby', 'N0ne', 'Ontario', 'Captain Falcon', 'Ganondorf', 'N0ned', '', '', 'n0ne13', ''),
(19, 'Joey Aldama', 'Lucky', 'Socal', 'Fox', '', 'TheLegendOfLucky', '', '', 'legend0flucky', ''),
(20, 'Otto Bisno', 'Silent Wolf', 'Pacific Northwest', 'Fox', '', 'SilentWolf444', '', 'DynastyeGaming', 'silentwolf444', ''),
(21, 'Ryan Coker-Welch', 'The Moon', 'Tri-State', 'Marth', '', 'TheMoon112', '', 'misfits', 'themoon112', ''),
(22, 'Daniel Rodriguez', 'Chudat', 'MD/VA', 'Ice Climbers', '', 'LiquidChu', '', 'Liquid', 'chudatz', ''),
(23, 'Sami Muhanna', 'DruggedFox', 'Georgia', 'Fox', 'Falco', 'DruggedFox', '', 'Balance', 'druggedfox', ''),
(24, 'Aaron Thomas', 'Professor Pro', 'United Kingdom', 'Fox', '', 'ProfessorProUK', '', '', 'professorpro', ''),
(25, 'Colin Green', 'Colbol', 'Florida', 'Fox', 'Marth', 'Colbol725', '', '', 'colbol', ''),
(26, 'McCain Lavelle', 'MacD', 'Socal', 'Peach', '', 'MacDSmash', '', 'Splyce', 'macdsmash', ''),
(27, 'Kyle Athayde', 'DizzKidBoogie', 'Norcal', 'Ice Climbers', '', 'DizzKidBoogie', '', '', 'dizzkidboogie', ''),
(28, 'Michael Pulido', 'MikeHaze', 'Socal', 'Fox', '', 'MikeHazeGaming', '', 'beastcoast', 'mikehazegaming', ''),
(29, 'David MacDonald', 'KirbyKaze', 'Canada', 'Sheik', '', 'KirbyKaze_', '', '', '', ''),
(30, 'Robert Wright', 'Wobbles', 'Texas', 'Ice Climbers', '', 'PG_Wobbles', '', 'Panda Gaming', 'icwobbles', ''),
(31, 'Julian Zhu', 'Zhu', 'Norcal', 'Falco', '', 'BOXRZhu', '', 'Boxr', '', ''),
(32, 'Masaya Chikamoto', 'Amsa', 'Japan', 'Yoshi', '', 'AmsaRedYoshi', '', 'VG BootCamp', 'amsayoshi', ''),
(33, 'Samuel Rohrer', 'Laudandus', 'Norcal', 'Sheik', '', 'Laudandus', '', '', 'laudandus', ''),
(34, 'Kalindi Henderson', 'KJH', 'Midwest', 'Fox', '', 'Spotdodge_Shine', '', '', 'kjh__', ''),
(35, 'Jason Diehl', 'Gahtzu', 'Florida', 'Captain Falcon', '', 'Gahtzu', '', '', '20gx', ''),
(36, 'Kashan Khan', 'Chillindude', 'MD/VA', 'Fox', '', 'LiquidChillin', '', 'Liquid', 'chillindude', ''),
(37, 'Javier Ruiz', 'Javi', 'Mexico', 'Fox', '', 'Javier_Ruiz', '', '', '', ''),
(38, 'Hugo Gonzalez', 'Hugs', 'Socal', 'Samus', '', 'Hugs86', '', '', 'hugs86', ''),
(39, 'Teddy Seybold', 'Bladewise', 'Pacific Northwest', 'Peach', '', 'Bladewise00', '', '', 'bladewise', ''),
(40, 'Steven Abate', 'Abate', 'PGH/NEOH', 'Luigi', '', 'AbateSmash', '', '', 'abatesmash', ''),
(41, 'Dustin White', 'Gravy', 'Florida', 'Captain Falcon', '', 'iAreGravy', '', '', 'iaregravy', ''),
(42, 'Abhishek Prabhu', 'Prince Abu', 'Midwest', 'Jigglypuff', '', 'ThePrinceOfSSBM', '', '', '', ''),
(43, 'Santiago Pinon', 'Santiago', 'Socal', 'Fox', 'Falco', 'SantiagoSmash', '', '', 'santiagosmash', ''),
(44, 'Alvaro Garcia Moral', 'Trifasia', 'Spain', 'Peach', '', 'Trifsmash', '', '', '', ''),
(45, 'Griffin Williams', 'Captain Faceroll', 'Socal', 'Sheik', '', 'SSBM_Faceroll', '', '', '', ''),
(46, 'Connor Nguyen', 'Connor', 'Socal', 'Fox', 'Sheik', 'SSBM_CDK', '', '', '', ''),
(47, 'Jason Gauthier', 'Infinite Numbers', 'New England', 'Ice Climbers', '', 'Numbers__SSB', '', '', '', ''),
(48, 'Ryan Ford', 'Ryan Ford', 'Canada', 'Fox', '', 'Ryan_Ford522', '', 'EarthRootGaming', 'ryanford522', ''),
(49, 'Jack Hoyt', 'Crush', 'New England', 'Fox', '', 'FSBR_Crush', '', '', '', ''),
(50, 'James Lauerman', 'Mafia', 'New England', 'Peach', '', 'SSBM_Mafia', '', '', '', ''),
(51, 'Anthony Detres', 'Slox', 'New England', 'Fox', 'Sheik', 'Slox_', '', '', '', ''),
(52, 'Diaki Ideoka', 'Rudolph', 'Japan', 'Marth', 'Fox', 'Rudolph_SSBM', '', '', '', ''),
(53, 'Roberto Iglesias', 'Overtriforce', 'Spain', 'Sheik', '', 'Overtriforce', '', 'Team Viral', 'overtriforce', ''),
(54, 'LLod', 'Arjun Malhotra', 'MD/VA', 'Peach', '', 'LLod74', '', '', '', ''),
(55, 'Kelly Smith', 'Kels', 'Midwest', 'Fox', 'Sheik', 'SSBM_Kels', '', '', '', ''),
(56, 'Eduardo Rincon', 'Eddy Mexico', 'Mexico', 'Luigi', '', 'EddyMexico007', '', '', 'eddymexico007', ''),
(57, 'Austin Demmon', 'Azusa', 'Norcal', 'Peach', '', 'AzusaSSBM', '', '', '', ''),
(58, 'Amsah Augustuszoon', 'Amsah', 'Netherlands', 'Sheik', '', 'TheRealAmsah', '', 'Asterion', '', ''),
(59, 'Austin Self', 'Redd', 'MD/VA', 'Fox', 'Marth', 'ReddSSBM', '', 'Kyoto eSports', 'redd', ''),
(60, 'Charles Meighen', 'Cactuar', 'Norcal', 'Fox', 'Marth', 'CactusSmash', '', 'Splyce', 'smashpractice', ''),
(61, 'Miguel Rodriguez Penalva', 'Zgetto', 'Netherlands', 'Fox', '', 'Zgetto', '', '', '', ''),
(62, 'Rishi Malhotra', 'SmashG0d', 'MD/VA', 'Marth', '', 'SmashG0d', '', '', '', ''),
(63, 'Andreas Lindgren', 'Android', 'Sweden', 'Sheik', '', 'UGS_Android', '', 'Alliance', 'alliance#_android', ''),
(64, 'Alex Cottrell', 'Captain Smuckers', 'Tri-State', 'Captain Falcon', '', 'CaptainSmuckers', '', '', 'captainsmuckers', ''),
(65, 'Hendrick Pilar', 'DJ Nintendo', 'New York', 'Fox', 'Pikachu', 'DJNintendo17', '', '', 'djnintendo', ''),
(66, 'Zain Naghmi', 'Zain', 'MD/VA', 'Marth', '', 'SSBMZain', '', '', 'zainssbm', ''),
(67, 'Justin Burroughs', 'Syrox', 'Colorado', 'Fox', '', 'SyroxM', '', 'Balance', 'syroxm', ''),
(68, 'Eric Lew', 'ESam', 'Florida', 'Samus', '', 'PGEsam', '', 'Panda Global', '', ''),
(69, 'Jeremy Deustch', 'Squid', 'Socal', 'Falco', '', 'SquidsLaugh', '', '', '', ''),
(70, 'Roustane Benzeguir', 'Kage the Warrior', 'Quebec', 'Ganondorf', '', 'KageTheWarrior', '', '', 'kagethewarrior', ''),
(71, 'Kyle Zhu', 'Kalamazhu', 'Norcal', 'Peach', '', 'MW_Buster', '', '', '', ''),
(72, 'Binyan Lin', 'DarkAtma', 'Norcal', 'Sheik', 'Peach', 'DarkAtma', '', '', '', ''),
(73, 'Oscar Nilsson', 'Lovage', 'Socal', 'Fox', '', 'Lovage805', '', '', '', ''),
(74, 'Andrew Vo', 'Tai', 'Arizona', 'Marth', '', 'TeeAyEye', '', '', '', ''),
(75, 'Drew Scoles', 'Drephen', 'Midwest', 'Sheik', '', 'Drephen', '', '', '', ''),
(76, 'Ammon Styles', 'Ka-Master', 'Utah', 'Luigi', '', 'Luigi_KaMaster', '', '', '', ''),
(77, 'William Truong', 'Trulliam', 'Ontario', 'Falco', '', 'Trulliam', '', '', 'trulliam', ''),
(78, 'Frank Borden', 'Frootloop', 'Norcal', 'Falco', 'Sheik', '', '', '', '', ''),
(79, 'Alex Ruvalcaba', 'Alex19', 'Socal', 'Fox', '', 'Mach1Alex19', '', '', 'mach1alex19', ''),
(80, 'Brandon Collier', 'HomeMadeWaffles', 'Norcal', 'Fox', 'Falco', 'YungWaff', '', '', '', ''),
(81, 'Cory Hong', 'Milkman', 'MD/VA', 'Fox', '', 'Milkman_SSBM', '', 'Olympus eSports', '', ''),
(82, 'Austin Conley', 'ARC', 'Texas', 'Marth', '', 'ARCSGotGame', '', 'FX', 'arcsgotgame', ''),
(83, 'Will Hsiao', 'Reno', 'Socal', 'Sheik', 'Fox', 'RenoNY', '', '', 'renony', ''),
(84, 'Daniel Lee', 'Tafokints', 'Socal', 'Sheik', '', 'Tafokints', '', 'Cloud9', 'tafokints', ''),
(85, 'Charles Kimmelman', 'Fuzzyness', 'United Kingdom', 'Fox', 'Captain Falcon', 'Fuzzyness', '', '', 'fuzzyness', ''),
(86, 'David Kim', 'Kira', 'Socal', 'Fox', '', 'SSBM_Kira', '', '', '', ''),
(87, 'Ken Hoang', 'Ken', 'Socal', 'Marth', '', 'LiquidKen', '', 'Liquid', 'liquidken', ''),
(88, 'Oscar Malherbe', 'Mojo', 'Texas', 'Fox', '', 'aHotCupOfMojo', '', '', 'smashunited', ''),
(89, 'Juan Garcia', 'Medz', 'Arizona', 'Fox', 'Marth', 'RG_Medz', '', '', '', ''),
(90, 'Alex Shnayder', 'Zanguzen', 'Tri-State', 'Falco', '', 'Zanguzen', '', '', '', ''),
(91, 'Phil DeBerry', 'Phil', 'Norcal', 'Fox', '', 'DoYouPhilsMe', '', '', 'doyouphilsme', ''),
(92, 'DarrellWhite', 'Darrell', 'Norcal', 'Samus', '', 'DarrellSamus', '', '', '', ''),
(93, 'Nicholas Whittier', 'NMW', 'Norcal', 'Captain Falcon', '', 'NMWHittier', '', '', '', ''),
(94, 'Clay Moulton', 'Porkchops', 'Florida', 'Falco', '', 'VSPorkchops', '', '', '', ''),
(95, 'Jacob Pinto', 'JFlex', 'Tri-State', 'Sheik', 'Fox', '', '', '', '', ''),
(96, 'Robby Gee', 'Vanity Angel', 'United Kingdom', 'Peach', '', 'VanityAngelSSBM', '', '', '', ''),
(97, 'Mike Scaturchio', '$Mike', 'North Carolina', 'Captain Falcon', '', 'FSBRMoneyMike', '', '', '', ''),
(98, 'Vikram Bassi', 'Nightmare', 'Ontario', 'Marth', '', 'Nightmare6God', '', '', '', ''),
(99, 'David Long', '4%', 'NEOH', 'Jigglypuff', '', '4PercentGaming', '', '', '', ''),
(100, 'Jay Dahya', 'Drunk Sloth', 'Florida', 'Ice Climbers', '', 'DrvnkSloth', '', '', '', '');

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
