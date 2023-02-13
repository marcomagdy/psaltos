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

