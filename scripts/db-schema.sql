# brew install mysql
# brew services restart mysql

CREATE TABLE `Assets` (
  `AssetId` int NOT NULL AUTO_INCREMENT,
  `TypeId` int NOT NULL,
  `Location` varchar(256) NOT NULL,
  `EnglishName` varchar(128) NOT NULL,
  `CopticName` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`AssetId`)
);

CREATE TABLE `Tags` (
  `TagId` int NOT NULL AUTO_INCREMENT,
  `CategoryId` int NOT NULL,
  `EnglishName` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`TagId`)
);

CREATE TABLE `Categories` (
  `CategoryId` int NOT NULL AUTO_INCREMENT,
  `EnglishName` varchar(128) NOT NULL,
  PRIMARY KEY (`CategoryId`)
);

CREATE TABLE `AssetToTag` (
  `AssetId` int NOT NULL,
  `TagId` int NOT NULL,
  PRIMARY KEY (`AssetId`, `TagId`)
);
