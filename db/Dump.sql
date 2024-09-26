CREATE DATABASE  IF NOT EXISTS `unifront` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `unifront`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: unifront
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcement` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` tinytext,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement`
--

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;
INSERT INTO `announcement` VALUES (5,'Medical Supplies Needed','Any of the following medical supplies are requested.','2024-09-15 07:53:27'),(6,'Clothing Needed','','2024-09-15 07:54:12'),(7,' Requesting food of the following kind.','','2024-09-15 07:56:53');
/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcement_has_item`
--

DROP TABLE IF EXISTS `announcement_has_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcement_has_item` (
  `announcement_id` int unsigned NOT NULL,
  `item_id` int unsigned NOT NULL,
  PRIMARY KEY (`announcement_id`,`item_id`),
  KEY `fk_announcement_has_item_item1_idx` (`item_id`),
  KEY `fk_announcement_has_item_announcement1_idx` (`announcement_id`),
  CONSTRAINT `fk_announcement_has_item_announcement1` FOREIGN KEY (`announcement_id`) REFERENCES `announcement` (`id`),
  CONSTRAINT `fk_announcement_has_item_item1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement_has_item`
--

LOCK TABLES `announcement_has_item` WRITE;
/*!40000 ALTER TABLE `announcement_has_item` DISABLE KEYS */;
INSERT INTO `announcement_has_item` VALUES (5,30),(5,31),(5,47),(7,90),(7,91),(5,93),(7,103),(6,106),(7,116),(7,120),(5,203),(6,214),(6,215),(6,216),(6,222),(6,223),(6,224),(5,239),(5,240),(7,244),(5,270),(5,271);
/*!40000 ALTER TABLE `announcement_has_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (5,'Food'),(6,'Beverages'),(7,'Clothing'),(8,'Hacker of class'),(9,'2d hacker'),(10,''),(11,'Test'),(13,'-----'),(14,'Flood'),(15,'new cat'),(16,'Medical Supplies'),(19,'Shoes'),(21,'Personal Hygiene '),(22,'Cleaning Supplies'),(23,'Tools'),(24,'Kitchen Supplies'),(25,'Baby Essentials'),(26,'Insect Repellents'),(27,'Electronic Devices'),(28,'Cold weather'),(29,'Animal Food'),(30,'Financial support'),(33,'Cleaning Supplies.'),(34,'Hot Weather'),(35,'First Aid '),(39,'Test_0'),(40,'test1'),(41,'pet supplies'),(42,'Μedicines'),(43,'Energy Drinks'),(44,'Disability and Assistance Items'),(45,'Communication items'),(46,'communications'),(47,'Humanitarian Shelters'),(48,'Water Purification'),(49,'Animal Care'),(50,'Earthquake Safety'),(51,'Sleep Essentilals'),(52,'Navigation Tools'),(53,'Clothing and cover'),(54,'Tools and Equipment'),(56,'Special items'),(57,'Household Items'),(59,'Books'),(60,'Fuel and Energy'),(61,'test category'),(65,'ood'),(66,'Animal Flood'),(67,'Solar-Powered Devices'),(68,'Mental Health Support');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `in_inventory`
--

DROP TABLE IF EXISTS `in_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `in_inventory` (
  `item_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`item_id`,`user_id`),
  KEY `fk_item_has_user_user1_idx` (`user_id`),
  KEY `fk_item_has_user_item1_idx` (`item_id`),
  CONSTRAINT `fk_item_has_user_item1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  CONSTRAINT `fk_item_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `in_inventory`
--

LOCK TABLES `in_inventory` WRITE;
/*!40000 ALTER TABLE `in_inventory` DISABLE KEYS */;
INSERT INTO `in_inventory` VALUES (20,1,12),(20,6,5),(21,1,12),(21,6,5),(22,1,10),(23,1,10),(23,6,5),(25,1,10),(25,6,5),(26,1,10),(26,6,5),(29,1,10),(29,6,5),(30,1,10),(30,6,5),(31,1,10),(31,7,5),(32,1,10),(32,7,5),(33,1,10),(33,7,5),(34,1,10),(34,7,5),(35,1,10),(35,7,5),(37,1,10),(37,7,5),(38,1,10),(38,7,5),(39,1,10),(39,8,5),(40,1,10),(40,8,5),(41,1,10),(41,8,5),(42,1,10),(42,8,5),(43,1,10),(43,8,5),(44,1,10),(44,8,5),(46,1,10),(46,8,5),(47,1,10),(47,9,5),(51,1,10),(51,9,5),(52,1,10),(52,9,5),(53,1,11),(53,9,5),(54,1,11),(54,9,5),(55,9,5),(56,1,10),(56,9,5),(57,1,10),(57,10,5),(58,1,10),(58,10,5),(59,1,10),(59,10,5),(60,1,10),(60,10,5),(61,10,5),(62,10,5),(63,10,5),(65,1,6),(66,1,4),(67,1,1),(68,1,2),(69,1,1);
/*!40000 ALTER TABLE `in_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `category_id` int unsigned NOT NULL,
  `details` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_item_category_idx` (`category_id`),
  CONSTRAINT `fk_item_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=290 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (20,'Men Sneakers',19,'[{\"detail_name\": \"size\", \"detail_value\": \"44\"}]'),(21,'Chocolate',5,'[{\"detail_name\": \"weight\", \"detail_value\": \"100g\"}, {\"detail_name\": \"type\", \"detail_value\": \"milk chocolate\"}, {\"detail_name\": \"brand\", \"detail_value\": \"ION\"}]'),(22,'Men Sneakers',5,'[{\"detail_name\": \"size\", \"detail_value\": \"44\"}]'),(23,'Test Product',9,'[{\"detail_name\": \"weight\", \"detail_value\": \"500g\"}, {\"detail_name\": \"pack size\", \"detail_value\": \"12\"}, {\"detail_name\": \"expiry date\", \"detail_value\": \"13/12/1978\"}]'),(25,'Spaghetti',5,'[{\"detail_name\": \"grams\", \"detail_value\": \"500\"}]'),(26,'Croissant',5,'[{\"detail_name\": \"calories\", \"detail_value\": \"200\"}]'),(29,'Biscuits',5,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(30,'Bandages',16,'[{\"detail_name\": \"\", \"detail_value\": \"25 pcs\"}]'),(31,'Disposable gloves',16,'[{\"detail_name\": \"\", \"detail_value\": \"100 pcs\"}]'),(32,'Gauze',16,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(33,'Antiseptic',16,'[{\"detail_name\": \"\", \"detail_value\": \"250ml\"}]'),(34,'First Aid Kit',16,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(35,'Painkillers',16,'[{\"detail_name\": \"volume\", \"detail_value\": \"200mg\"}]'),(37,'Fakes',5,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(38,'Menstrual Pads',21,'[{\"detail_name\": \"stock\", \"detail_value\": \"500\"}, {\"detail_name\": \"size\", \"detail_value\": \"3\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(39,'Tampon',21,'[{\"detail_name\": \"stock\", \"detail_value\": \"500\"}, {\"detail_name\": \"size\", \"detail_value\": \"regular\"}]'),(40,'Toilet Paper',21,'[{\"detail_name\": \"stock\", \"detail_value\": \"300\"}, {\"detail_name\": \"ply\", \"detail_value\": \"3\"}]'),(41,'Baby wipes',21,'[{\"detail_name\": \"volume\", \"detail_value\": \"500gr\"}, {\"detail_name\": \"stock \", \"detail_value\": \"500\"}, {\"detail_name\": \"scent\", \"detail_value\": \"aloe\"}]'),(42,'Toothbrush',21,'[{\"detail_name\": \"stock\", \"detail_value\": \"500\"}]'),(43,'Toothpaste',21,'[{\"detail_name\": \"stock\", \"detail_value\": \"250\"}]'),(44,'Vitamin C',16,'[{\"detail_name\": \"stock\", \"detail_value\": \"200\"}]'),(46,'Paracetamol',16,'[{\"detail_name\": \"stock\", \"detail_value\": \"2000\"}, {\"detail_name\": \"dosage\", \"detail_value\": \"500mg\"}]'),(47,'Ibuprofen',16,'[{\"detail_name\": \"stock \", \"detail_value\": \"10\"}, {\"detail_name\": \"dosage\", \"detail_value\": \"200mg\"}]'),(48,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(49,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(50,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(51,'Cleaning rag',22,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(52,'Detergent',22,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(53,'Disinfectant',22,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(54,'Mop',22,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(55,'Plastic bucket',22,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(56,'Scrub brush',22,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(57,'Dust mask',22,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(58,'Broom',22,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(59,'Hammer',23,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(60,'Skillsaw',23,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(61,'Prybar',23,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(62,'Shovel',23,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(63,'Flashlight',23,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(64,'Duct tape',23,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(65,'Underwear',7,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(66,'Socks',7,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(67,'Warm Jacket',7,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(68,'Raincoat',7,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(69,'Gloves',7,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(70,'Pants',7,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(71,'Boots',7,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(72,'Dishes',24,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(73,'Pots',24,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(74,'Paring knives',24,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(75,'Pan',24,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(76,'Glass',24,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(77,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(78,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(79,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(80,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(81,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(82,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}, {\"detail_name\": \"ghw56\", \"detail_value\": \"twhwhrwh\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(84,'water ',6,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(85,'Coca Cola',6,'[{\"detail_name\": \"Volume\", \"detail_value\": \"500ml\"}]'),(86,'spray',26,'[{\"detail_name\": \"volume\", \"detail_value\": \"75ml\"}]'),(87,'Outdoor spiral',26,'[{\"detail_name\": \"duration\", \"detail_value\": \"7 hours\"}]'),(88,'Baby bottle',25,'[{\"detail_name\": \"volume\", \"detail_value\": \"250ml\"}]'),(89,'Pacifier',25,'[{\"detail_name\": \"material\", \"detail_value\": \"silicone\"}]'),(90,'Condensed milk',5,'[{\"detail_name\": \"weight\", \"detail_value\": \"400gr\"}]'),(91,'Cereal bar',5,'[{\"detail_name\": \"weight\", \"detail_value\": \"23,5gr\"}]'),(92,'Pocket Knife',23,'[{\"detail_name\": \"Number of different tools\", \"detail_value\": \"3\"}, {\"detail_name\": \"Tool\", \"detail_value\": \"Knife\"}, {\"detail_name\": \"Tool\", \"detail_value\": \"Screwdriver\"}, {\"detail_name\": \"Tool\", \"detail_value\": \"Spoon\"}]'),(93,'Water Disinfection Tablets',16,'[{\"detail_name\": \"Basic Ingredients\", \"detail_value\": \"Iodine\"}, {\"detail_name\": \"Suggested for\", \"detail_value\": \"Everyone expept pregnant women\"}]'),(94,'Radio',27,'[{\"detail_name\": \"Power\", \"detail_value\": \"Batteries\"}, {\"detail_name\": \"Frequencies Range\", \"detail_value\": \"3 kHz - 3000 GHz\"}]'),(95,'Kitchen appliances',14,'[{\"detail_name\": \"\", \"detail_value\": \"(scrubbers, rubber gloves, kitchen detergent, laundry soap)\"}]'),(96,'Winter hat',28,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(97,'Winter gloves',28,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(98,'Scarf',28,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(99,'Thermos',28,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(100,'Tea',6,'[{\"detail_name\": \"volume\", \"detail_value\": \"500ml\"}]'),(101,'Dog Food ',29,'[{\"detail_name\": \"volume\", \"detail_value\": \"500g\"}]'),(102,'Cat Food',29,'[{\"detail_name\": \"volume\", \"detail_value\": \"500g\"}]'),(103,'Canned',5,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(104,'Chlorine',22,'[{\"detail_name\": \"volume\", \"detail_value\": \"500ml\"}]'),(105,'Medical gloves',22,'[{\"detail_name\": \"volume\", \"detail_value\": \"20pieces\"}]'),(106,'T-Shirt',7,'[{\"detail_name\": \"size\", \"detail_value\": \"XL\"}]'),(107,'Cooling Fan',34,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(108,'Cool Scarf',34,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(109,'Whistle',23,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(110,'Blankets',28,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(111,'Sleeping Bag',28,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(112,'Toothbrush',21,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(113,'Toothpaste',21,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(114,'Thermometer',16,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(115,'Rice',5,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(116,'Bread',5,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(117,'Towels',22,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(118,'Wet Wipes',22,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(119,'Fire Extinguisher',23,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(120,'Fruits',5,'[{\"detail_name\": \"\", \"detail_value\": \"\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(121,'Duct Tape',23,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(122,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(123,'Αθλητικά',19,'[{\"detail_name\": \"Νο 46\", \"detail_value\": \"\"}]'),(124,'Πασατέμπος',5,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(125,'Bandages',35,'[{\"detail_name\": \"Adhesive\", \"detail_value\": \"2 meters\"}]'),(126,'Betadine',35,'[{\"detail_name\": \"Povidone iodine 10%\", \"detail_value\": \"240 ml\"}]'),(127,'cotton wool',35,'[{\"detail_name\": \"100% Hydrofile\", \"detail_value\": \"70gr\"}]'),(128,'Crackers',5,'[{\"detail_name\": \"Quantity per package\", \"detail_value\": \"10\"}, {\"detail_name\": \"Packages\", \"detail_value\": \"2\"}]'),(129,'Sanitary Pads',21,'[{\"detail_name\": \"piece\", \"detail_value\": \"10 pieces\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(130,'Sanitary wipes',21,'[{\"detail_name\": \"pank\", \"detail_value\": \"10 packs\"}]'),(131,'Electrolytes',16,'[{\"detail_name\": \"packet of pills\", \"detail_value\": \"20 pills\"}]'),(132,'Pain killers',16,'[{\"detail_name\": \"packet of pills\", \"detail_value\": \"20 pills\"}]'),(133,'Flashlight',23,'[{\"detail_name\": \"pieces\", \"detail_value\": \"1\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(134,'Juice',6,'[{\"detail_name\": \"volume\", \"detail_value\": \"500ml\"}]'),(135,'Toilet Paper',21,'[{\"detail_name\": \"rolls\", \"detail_value\": \"1 roll\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(136,'Sterilized Saline',16,'[{\"detail_name\": \"volume\", \"detail_value\": \"100ml\"}]'),(137,'Biscuits',5,'[{\"detail_name\": \"packet\", \"detail_value\": \"1 packet\"}]'),(138,'Antihistamines',16,'[{\"detail_name\": \"pills\", \"detail_value\": \"10 pills\"}]'),(139,'Instant Pancake Mix',5,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(140,'Lacta',5,'[{\"detail_name\": \"weight\", \"detail_value\": \"105g\"}]'),(141,'Canned Tuna',5,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(142,'Batteries',23,'[{\"detail_name\": \"6 pack\", \"detail_value\": \"\"}]'),(143,'Dust Mask',35,'[{\"detail_name\": \"1\", \"detail_value\": \"\"}]'),(144,'Can Opener',23,'[{\"detail_name\": \"1\", \"detail_value\": \"\"}]'),(145,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(146,'Πατατάκια',5,'[{\"detail_name\": \"weight\", \"detail_value\": \"45g\"}]'),(147,'Σερβιέτες',21,'[{\"detail_name\": \"pcs\", \"detail_value\": \"18\"}]'),(148,'Dry Cranberries',5,'[{\"detail_name\": \"weight\", \"detail_value\": \"100\"}]'),(149,'Dry Apricots',5,'[{\"detail_name\": \"weight\", \"detail_value\": \"100\"}]'),(150,'Dry Figs',5,'[{\"detail_name\": \"weight\", \"detail_value\": \"100\"}]'),(151,'Παξιμάδια',5,'[{\"detail_name\": \"weight\", \"detail_value\": \"200g\"}]'),(152,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(153,'Test Item',11,'[{\"detail_name\": \"volume\", \"detail_value\": \"200g\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(154,'Painkillers',35,'[{\"detail_name\": \"Potency\", \"detail_value\": \"High\"}]'),(155,'Tampons',16,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(156,'plaster set',41,'[{\"detail_name\": \"1\", \"detail_value\": \"\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(157,'elastic bandages',41,'[{\"detail_name\": \"\", \"detail_value\": \"12\"}]'),(158,'traumaplast',41,'[{\"detail_name\": \"\", \"detail_value\": \"20\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(159,'thermal blanket',41,'[{\"detail_name\": \"\", \"detail_value\": \"2\"}]'),(160,'burn gel',41,'[{\"detail_name\": \"ml\", \"detail_value\": \"500\"}]'),(161,'pet carrier',41,'[{\"detail_name\": \"\", \"detail_value\": \"2\"}]'),(162,'pet dishes',41,'[{\"detail_name\": \"\", \"detail_value\": \"10\"}]'),(163,'plastic bags',41,'[{\"detail_name\": \"\", \"detail_value\": \"20\"}]'),(164,'toys',41,'[{\"detail_name\": \"\", \"detail_value\": \"5\"}]'),(165,'burn pads',41,'[{\"detail_name\": \"\", \"detail_value\": \"5\"}]'),(166,'cheese',5,'[{\"detail_name\": \"grams\", \"detail_value\": \"1000\"}]'),(167,'lettuce',5,'[{\"detail_name\": \"grams\", \"detail_value\": \"500\"}]'),(168,'eggs',5,'[{\"detail_name\": \"pair\", \"detail_value\": \"10\"}]'),(169,'steaks',5,'[{\"detail_name\": \"grams\", \"detail_value\": \"1000\"}]'),(170,'beef burgers',5,'[{\"detail_name\": \"grams\", \"detail_value\": \"500\"}]'),(171,'tomatoes',5,'[{\"detail_name\": \"grams\", \"detail_value\": \"1000\"}]'),(172,'onions',5,'[{\"detail_name\": \"grams\", \"detail_value\": \"500\"}]'),(173,'flour',5,'[{\"detail_name\": \"grams\", \"detail_value\": \"1000\"}]'),(174,'pastel',5,'[{\"detail_name\": \"\", \"detail_value\": \"7\"}]'),(175,'nuts',5,'[{\"detail_name\": \"grams\", \"detail_value\": \"500\"}]'),(176,'dramamines',42,'[{\"detail_name\": \"\", \"detail_value\": \"5\"}]'),(177,'nurofen',42,'[{\"detail_name\": \"\", \"detail_value\": \"10\"}]'),(178,'imodium',42,'[{\"detail_name\": \"\", \"detail_value\": \"5\"}]'),(179,'emetostop',42,'[{\"detail_name\": \"\", \"detail_value\": \"5\"}]'),(180,'xanax',42,'[{\"detail_name\": \"\", \"detail_value\": \"5\"}]'),(181,'saflutan',42,'[{\"detail_name\": \"\", \"detail_value\": \"2\"}]'),(182,'sadolin',42,'[{\"detail_name\": \"\", \"detail_value\": \"3\"}]'),(183,'depon',42,'[{\"detail_name\": \"\", \"detail_value\": \"20\"}]'),(184,'panadol',42,'[{\"detail_name\": \"\", \"detail_value\": \"6\"}]'),(185,'ponstan ',42,'[{\"detail_name\": \"\", \"detail_value\": \"10\"}]'),(186,'algofren',42,'[{\"detail_name\": \"10\", \"detail_value\": \"600ml\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(187,'effervescent depon',42,'[{\"detail_name\": \"67\", \"detail_value\": \"1000mg\"}]'),(188,'cold coffee',6,'[{\"detail_name\": \"10\", \"detail_value\": \"330ml\"}]'),(189,'Hell',43,'[{\"detail_name\": \"22\", \"detail_value\": \"330\"}]'),(194,'Lighter',23,'[{\"detail_name\": \"16\", \"detail_value\": \"Mini\"}]'),(195,'isothermally shirts',28,'[{\"detail_name\": \"5\", \"detail_value\": \"Medium\"}, {\"detail_name\": \"6\", \"detail_value\": \"Large\"}, {\"detail_name\": \"10\", \"detail_value\": \"Small\"}, {\"detail_name\": \"2\", \"detail_value\": \"XL\"}]'),(196,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(197,'Depon',42,'[{\"detail_name\": \"10\", \"detail_value\": \"500mg\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(198,'Shorts',34,'[{\"detail_name\": \"20\", \"detail_value\": \"\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(199,'Chicken',5,'[{\"detail_name\": \"5\", \"detail_value\": \"1.5kg\"}]'),(200,'Toilet Paper',21,'[{\"detail_name\": \"20\", \"detail_value\": \"200g\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(201,'toys',41,'[{\"detail_name\": \"30\", \"detail_value\": \"\"}]'),(202,'sanitary napkins',21,'[{\"detail_name\": \"30\", \"detail_value\": \"500g\"}]'),(203,'COVID-19 Tests',16,'[{\"detail_name\": \"20\", \"detail_value\": \"\"}]'),(204,'Club Soda',6,'[{\"detail_name\": \"volume\", \"detail_value\": \"500ml\"}]'),(205,'Wheelchairs',44,'[{\"detail_name\": \"quantity\", \"detail_value\": \"100\"}]'),(206,'mobile phones',45,'[{\"detail_name\": \"iphone\", \"detail_value\": \"200\"}]'),(207,'spoon',24,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(208,'fork',24,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(209,'MOTOTRBO R7',45,'[{\"detail_name\": \"band\", \"detail_value\": \"UHF/VHF\"}, {\"detail_name\": \"Wi-Fi\", \"detail_value\": \"2,4/5,0 GHz\"}, {\"detail_name\": \"Bluetooth\", \"detail_value\": \"5.2\"}, {\"detail_name\": \"Οθόνη\", \"detail_value\": \"2,4” 320 x 240 px. QVGA\"}, {\"detail_name\": \"διάρκεια ζωής της μπαταρίας\", \"detail_value\": \"28 ώρες\"}]'),(210,'RM LA 250 (VHF Linear Ενισχυτής 140-150MHz)',45,'[{\"detail_name\": \"Frequency\", \"detail_value\": \"140-150Mhz\"}, {\"detail_name\": \"Power Supply\", \"detail_value\": \"13VDC /- 1V 40A\"}, {\"detail_name\": \"Output RF Power (Nominal)\", \"detail_value\": \"30 – 210W ; 230W max AM/FM/CW\"}, {\"detail_name\": \"Modulation Types\", \"detail_value\": \"SSB,CW,AM, FM, data etc (All narrowband modes)\"}]'),(211,'Humanitarian General Purpose Tent System (HGPTS)',47,'[{\"detail_name\": \"PART NUMBER\", \"detail_value\": \"C14Y016X016-T\"}, {\"detail_name\": \"CONTRACTOR NAME:\", \"detail_value\": \"CELINA Tent, Inc\"}, {\"detail_name\": \"COLOR\", \"detail_value\": \"Tan\"}, {\"detail_name\": \"SET-UP TIME/NUMBER OF PERSONS\", \"detail_value\": \"4 People/30 Minutes\"}]'),(212,'CELINA Dynamic Small Shelter ',47,'[{\"detail_name\": \"dimensions\", \"detail_value\": \" 20’x32.5’\"}, {\"detail_name\": \"TYPE\", \"detail_value\": \"Frame Structure, Expandable, Air-Transportable\"}, {\"detail_name\": \"WEIGHT\", \"detail_value\": \"1,200 lbs\"}]'),(213,'Multi-purpose Area Shelter System, Type-I',47,'[{\"detail_name\": \"TYPE\", \"detail_value\": \"Frame Structure, Expandable, Air- Transportable\"}, {\"detail_name\": \"DIMENSIONS\", \"detail_value\": \"E I-40’x80’\"}, {\"detail_name\": \"WEIGHT\", \"detail_value\": \"24,000 lbs\"}]'),(214,'Trousers',7,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(215,'Shoes',7,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(216,'Hoodie',7,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(217,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(218,'dog food',49,'[{\"detail_name\": \"weight\", \"detail_value\": \"1k\"}]'),(219,'cat food',49,'[{\"detail_name\": \"weight\", \"detail_value\": \"1k\"}]'),(220,'macaroni',5,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(221,'rice',5,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(222,'scarf',7,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(223,'gloves',7,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(224,'underwear',7,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(225,'Silver blanket',50,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(226,'Helmet',50,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(227,'Disposable toilet',50,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(228,'Self-generated flashlight',50,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(229,'Mattresses ',51,'[{\"detail_name\": \"size\", \"detail_value\": \"1.90X60\"}]'),(231,'matches',51,'[{\"detail_name\": \"pack\", \"detail_value\": \"60\"}]'),(232,'Heater',51,'[{\"detail_name\": \"Volts\", \"detail_value\": \"208\"}]'),(233,'Earplugs',51,'[{\"detail_name\": \"material\", \"detail_value\": \"plastic\"}]'),(234,'Compass',52,'[{\"detail_name\": \"Type\", \"detail_value\": \"Digital\"}]'),(235,'Map',52,'[{\"detail_name\": \"Material\", \"detail_value\": \"Paper\"}]'),(236,'GPS',52,'[{\"detail_name\": \"Type\", \"detail_value\": \"Waterproof\"}]'),(237,'First Aid',16,'[{\"detail_name\": \"1\", \"detail_value\": \"1\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(238,'Bandage',16,'[{\"detail_name\": \"\", \"detail_value\": \"5\"}]'),(239,'Mask',16,'[{\"detail_name\": \"\", \"detail_value\": \"10\"}]'),(240,'Medicines',16,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(241,'Water',5,'[{\"detail_name\": \"6\", \"detail_value\": \"1500ml\"}]'),(242,'Canned Goods',5,'[{\"detail_name\": \"2\", \"detail_value\": \"80g\"}]'),(243,'Snacks',5,'[{\"detail_name\": \"3\", \"detail_value\": \"100g\"}]'),(244,'Cereals',5,'[{\"detail_name\": \"1\", \"detail_value\": \"800g\"}]'),(245,'Blankets',53,'[{\"detail_name\": \"1\", \"detail_value\": \"\"}]'),(246,'Shirt',53,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(247,'Pants',53,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(248,'Shoes',53,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(249,'Socks',53,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(250,'Caps',53,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(251,'Gloves',53,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(252,'Flashlight',54,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(253,'Batteries',54,'[{\"detail_name\": \"AAA\", \"detail_value\": \"5\"}]'),(254,'Repair Tools',54,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(255,'Soap and Shampoo',21,'[{\"detail_name\": \"1\", \"detail_value\": \"200ml\"}]'),(256,'Toothpastes and Toothbrushes',21,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(257,'Towels',21,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(259,'Animal food',56,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(260,'Pots',57,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(261,'Plates',57,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(262,'Cups',57,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(263,'Cutlery ',57,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(264,'Cleaning Supplies',57,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(265,'Kitchen Appliances',57,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(266,'Home Repair Tools',57,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(267,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(268,'Lord of the Rings',59,'[{\"detail_name\": \"pages\", \"detail_value\": \"230\"}]'),(270,'DEPON',16,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(271,'Painkillers',16,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(272,'Gasoline',60,'[{\"detail_name\": \"galons\", \"detail_value\": \"20\"}]'),(273,'Power Banks',60,'[{\"detail_name\": \"quantity\", \"detail_value\": \"5\"}]'),(277,'T4 Levothyroxine',42,'[{\"detail_name\": \"pills\", \"detail_value\": \"60 pills\"}]'),(278,'',10,'[{\"detail_name\": \"\", \"detail_value\": \"\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(279,'Solar Charger',67,'[{\"detail_name\": \"\", \"detail_value\": \"\"}, {\"detail_name\": \"\", \"detail_value\": \"\"}]'),(280,'Solar-Powered Radio',67,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(281,'Solar Torch',67,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(283,'Guided Meditation Audio',68,'[{\"detail_name\": \"\", \"detail_value\": \"\"}]'),(289,'nutella',5,'[]');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offer`
--

DROP TABLE IF EXISTS `offer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offer` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `citizen_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('pending','accepted','completed','cancelled') NOT NULL DEFAULT 'pending',
  `assigned_rescuer_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_offer_user1_idx` (`citizen_id`),
  KEY `fk_offer_user2_idx` (`assigned_rescuer_id`),
  CONSTRAINT `fk_offer_user1` FOREIGN KEY (`citizen_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_offer_user2` FOREIGN KEY (`assigned_rescuer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offer`
--

LOCK TABLES `offer` WRITE;
/*!40000 ALTER TABLE `offer` DISABLE KEYS */;
INSERT INTO `offer` VALUES (4,11,'2024-09-15 07:57:36','2024-09-16 17:12:14','accepted',8),(5,12,'2024-09-15 07:58:51','2024-09-16 17:12:14','accepted',8);
/*!40000 ALTER TABLE `offer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offer_has_item`
--

DROP TABLE IF EXISTS `offer_has_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offer_has_item` (
  `offer_id` int unsigned NOT NULL,
  `item_id` int unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  PRIMARY KEY (`offer_id`,`item_id`),
  KEY `fk_offer_has_item_item1_idx` (`item_id`),
  KEY `fk_offer_has_item_offer1_idx` (`offer_id`),
  CONSTRAINT `fk_offer_has_item_item1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  CONSTRAINT `fk_offer_has_item_offer1` FOREIGN KEY (`offer_id`) REFERENCES `offer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offer_has_item`
--

LOCK TABLES `offer_has_item` WRITE;
/*!40000 ALTER TABLE `offer_has_item` DISABLE KEYS */;
INSERT INTO `offer_has_item` VALUES (4,30,6),(4,31,5),(4,239,3),(5,106,4),(5,214,2),(5,216,2),(5,223,1);
/*!40000 ALTER TABLE `offer_has_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `citizen_id` int unsigned NOT NULL,
  `people_in_need` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('pending','accepted','completed','cancelled') NOT NULL DEFAULT 'pending',
  `assigned_rescuer_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_table1_user1_idx` (`citizen_id`),
  KEY `fk_request_user1_idx` (`assigned_rescuer_id`),
  CONSTRAINT `fk_request_user1` FOREIGN KEY (`assigned_rescuer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_table1_user1` FOREIGN KEY (`citizen_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (5,13,3,'2024-09-15 12:22:49','2024-09-15 12:22:49','pending',NULL),(6,14,5,'2024-09-15 12:25:41','2024-09-15 12:25:41','pending',NULL);
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_has_item`
--

DROP TABLE IF EXISTS `request_has_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_has_item` (
  `request_id` int unsigned NOT NULL,
  `item_id` int unsigned NOT NULL,
  PRIMARY KEY (`request_id`,`item_id`),
  KEY `fk_request_has_item_item1_idx` (`item_id`),
  KEY `fk_request_has_item_request1_idx` (`request_id`),
  CONSTRAINT `fk_request_has_item_item1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  CONSTRAINT `fk_request_has_item_request1` FOREIGN KEY (`request_id`) REFERENCES `request` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_has_item`
--

LOCK TABLES `request_has_item` WRITE;
/*!40000 ALTER TABLE `request_has_item` DISABLE KEYS */;
INSERT INTO `request_has_item` VALUES (5,21),(5,25),(5,29),(5,37),(6,40),(6,42),(6,43),(6,59),(6,68),(6,69);
/*!40000 ALTER TABLE `request_has_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(32) NOT NULL,
  `user_type` enum('citizen','rescuer','admin') NOT NULL,
  `longitude` decimal(10,8) DEFAULT NULL,
  `latitude` decimal(11,8) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'admin','admin','admin',0.00000000,0.00000000,NULL,NULL,NULL),(6,'nikos.rescuer1@example.com','nikosr1','password123','rescuer',23.72850800,37.98381000,'6901234561','Νίκος','Παπαδόπουλος'),(7,'george.rescuer2@example.com','georger2','password123','rescuer',23.72754100,37.98482000,'6901234562','Γιώργος','Οικονόμου'),(8,'kostas.rescuer3@example.com','kostasr3','password123','rescuer',23.72901200,37.98430000,'6901234563','Κώστας','Λαμπρόπουλος'),(9,'maria.rescuer4@example.com','mariar4','password123','rescuer',23.72789000,37.98245600,'6901234564','Μαρία','Γεωργίου'),(10,'eleni.rescuer5@example.com','elenir5','password123','rescuer',23.72647800,37.98390100,'6901234565','Ελένη','Δημητρίου'),(11,'alexandros.citizen1@example.com','alexandrosc1','password123','citizen',23.73250000,37.98400000,'6911234561','Αλέξανδρος','Καραγιάννης'),(12,'katerina.citizen2@example.com','katerinac2','password123','citizen',23.73020000,37.98510000,'6911234562','Κατερίνα','Κωνσταντίνου'),(13,'dimitris.citizen3@example.com','dimitrisc3','password123','citizen',23.73123400,37.98234500,'6911234563','Δημήτρης','Χριστοδούλου'),(14,'ioanna.citizen4@example.com','ioannac4','password123','citizen',23.73210000,37.98350000,'6911234564','Ιωάννα','Αλεξίου'),(15,'vangelis.citizen5@example.com','vangelisc5','password123','citizen',23.73330000,37.98440000,'6911234565','Βαγγέλης','Σταματίου'),(16,'sofia.citizen6@example.com','sofiac6','password123','citizen',23.73080000,37.98220000,'6911234566','Σοφία','Αθανασίου'),(17,'panos.citizen7@example.com','panosc7','password123','citizen',23.73170000,37.98360000,'6911234567','Πάνος','Μαυρογιάννης'),(18,'dionysis.citizen8@example.com','dionysisc8','password123','citizen',23.72960000,37.98420000,'6911234568','Διονύσης','Ανδρεόπουλος'),(19,'chara.citizen9@example.com','charac9','password123','citizen',23.73130000,37.98290000,'6911234569','Χαρά','Μιχαηλίδου'),(20,'nikolas.citizen10@example.com','nikolasc10','password123','citizen',23.72890000,37.98310000,'6911234570','Νικόλας','Πετρίδης');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-16 21:52:29
