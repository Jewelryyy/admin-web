/*
 Navicat Premium Data Transfer

 Source Server         : Javonn
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : mall

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 24/05/2024 15:58:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `mid` int NOT NULL AUTO_INCREMENT,
  `menuName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `menuLevel` int NOT NULL DEFAULT 1,
  `frontName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isEnabled` tinyint NOT NULL DEFAULT 0,
  `parentMenu` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`mid`) USING BTREE,
  INDEX `parentMenu`(`parentMenu` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (2, '首页', 1, 'dashboard', 'HomeFilled', 1, 0);
INSERT INTO `menu` VALUES (3, '商品', 1, 'product', 'ShoppingFilled', 1, 0);
INSERT INTO `menu` VALUES (4, '订单', 1, 'order', 'AuditOutlined', 1, 0);
INSERT INTO `menu` VALUES (5, '营销', 1, 'sms', 'PropertySafetyFilled', 1, 0);
INSERT INTO `menu` VALUES (6, '权限', 1, 'auth', 'KeyOutlined', 1, 0);
INSERT INTO `menu` VALUES (7, '仪表盘', 2, 'home', 'BarChartOutlined', 1, 2);
INSERT INTO `menu` VALUES (8, '商品列表', 2, 'list', 'ShoppingFilled', 1, 3);
INSERT INTO `menu` VALUES (9, '商品分类', 2, 'category', 'ShoppingFilled', 1, 3);
INSERT INTO `menu` VALUES (10, '订单列表', 2, 'list', 'AuditOutlined', 1, 4);
INSERT INTO `menu` VALUES (11, '订单设置', 2, 'settings', 'AuditOutlined', 1, 4);
INSERT INTO `menu` VALUES (12, '优惠券列表', 2, 'couponlst', 'PropertySafetyFilled', 1, 5);
INSERT INTO `menu` VALUES (13, '秒杀活动列表', 2, 'seckilllst', 'PropertySafetyFilled', 1, 5);
INSERT INTO `menu` VALUES (14, '用户管理', 2, 'user', 'UserOutlined', 1, 6);
INSERT INTO `menu` VALUES (15, '角色管理', 2, 'role', 'UsergroupAddOutlined', 1, 6);
INSERT INTO `menu` VALUES (16, '菜单管理', 2, 'menu', 'ProductOutlined', 1, 6);
INSERT INTO `menu` VALUES (17, '资源管理', 2, 'resource', 'DatabaseOutlined', 1, 6);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `userNum` int NULL DEFAULT NULL,
  `addTime` datetime NOT NULL,
  `isEnabled` tinyint NULL DEFAULT 0,
  PRIMARY KEY (`roleId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '超级管理员', '拥有所有查看和操作功能', 1, '2024-05-18 14:30:52', 1);
INSERT INTO `role` VALUES (2, '商品管理员', '只能查看及操作商品', 1, '2024-05-18 14:32:48', 1);
INSERT INTO `role` VALUES (3, '订单管理员', '只能查看及操作订单', 0, '2024-05-18 14:33:15', 1);

-- ----------------------------
-- Table structure for rolemenu
-- ----------------------------
DROP TABLE IF EXISTS `rolemenu`;
CREATE TABLE `rolemenu`  (
  `rmId` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `mid` int NOT NULL,
  PRIMARY KEY (`rmId`) USING BTREE,
  INDEX `r`(`roleId` ASC) USING BTREE,
  INDEX `m`(`mid` ASC) USING BTREE,
  CONSTRAINT `m` FOREIGN KEY (`mid`) REFERENCES `menu` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `r` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 230 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rolemenu
-- ----------------------------
INSERT INTO `rolemenu` VALUES (32, 2, 2);
INSERT INTO `rolemenu` VALUES (33, 2, 7);
INSERT INTO `rolemenu` VALUES (34, 2, 3);
INSERT INTO `rolemenu` VALUES (35, 2, 8);
INSERT INTO `rolemenu` VALUES (36, 2, 9);
INSERT INTO `rolemenu` VALUES (37, 2, 5);
INSERT INTO `rolemenu` VALUES (38, 2, 12);
INSERT INTO `rolemenu` VALUES (39, 2, 13);
INSERT INTO `rolemenu` VALUES (40, 3, 2);
INSERT INTO `rolemenu` VALUES (41, 3, 7);
INSERT INTO `rolemenu` VALUES (42, 3, 4);
INSERT INTO `rolemenu` VALUES (43, 3, 10);
INSERT INTO `rolemenu` VALUES (44, 3, 11);
INSERT INTO `rolemenu` VALUES (45, 3, 5);
INSERT INTO `rolemenu` VALUES (46, 3, 12);
INSERT INTO `rolemenu` VALUES (47, 3, 13);
INSERT INTO `rolemenu` VALUES (214, 1, 2);
INSERT INTO `rolemenu` VALUES (215, 1, 3);
INSERT INTO `rolemenu` VALUES (216, 1, 4);
INSERT INTO `rolemenu` VALUES (217, 1, 5);
INSERT INTO `rolemenu` VALUES (218, 1, 7);
INSERT INTO `rolemenu` VALUES (219, 1, 8);
INSERT INTO `rolemenu` VALUES (220, 1, 9);
INSERT INTO `rolemenu` VALUES (221, 1, 10);
INSERT INTO `rolemenu` VALUES (222, 1, 11);
INSERT INTO `rolemenu` VALUES (223, 1, 12);
INSERT INTO `rolemenu` VALUES (224, 1, 13);
INSERT INTO `rolemenu` VALUES (225, 1, 14);
INSERT INTO `rolemenu` VALUES (226, 1, 15);
INSERT INTO `rolemenu` VALUES (227, 1, 16);
INSERT INTO `rolemenu` VALUES (228, 1, 6);
INSERT INTO `rolemenu` VALUES (229, 1, 17);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `addTime` datetime NOT NULL,
  `lastLogin` datetime NULL DEFAULT NULL,
  `isEnabled` tinyint UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', 'jewelry@foxmail.com', '123456', '2024-05-17 20:04:34', '2024-05-22 21:48:21', 1);
INSERT INTO `user` VALUES (3, 'lujiewen', '21301131@bjtu.edu.cn', '123456', '2024-05-18 14:00:15', '2024-05-21 16:44:55', 1);
INSERT INTO `user` VALUES (4, 'test', 'j2166383@gmail.com', 'wwwwww', '2024-05-18 14:01:43', NULL, 0);

-- ----------------------------
-- Table structure for userrole
-- ----------------------------
DROP TABLE IF EXISTS `userrole`;
CREATE TABLE `userrole`  (
  `urId` int NOT NULL AUTO_INCREMENT,
  `userId` int NULL DEFAULT NULL,
  `roleId` int NULL DEFAULT NULL,
  PRIMARY KEY (`urId`) USING BTREE,
  INDEX `userId`(`userId` ASC) USING BTREE,
  INDEX `roleId`(`roleId` ASC) USING BTREE,
  CONSTRAINT `roleId` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userrole
-- ----------------------------
INSERT INTO `userrole` VALUES (5, 1, 1);
INSERT INTO `userrole` VALUES (6, 3, 2);

-- ----------------------------
-- Triggers structure for table userrole
-- ----------------------------
DROP TRIGGER IF EXISTS `update_userNum`;
delimiter ;;
CREATE TRIGGER `update_userNum` AFTER INSERT ON `userrole` FOR EACH ROW BEGIN
    UPDATE role
    SET userNum = (
        SELECT COUNT(userId)
        FROM userrole
        WHERE userrole.roleId = NEW.roleId
    )
    WHERE roleId = NEW.roleId;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table userrole
-- ----------------------------
DROP TRIGGER IF EXISTS `update_userNum_after_delete`;
delimiter ;;
CREATE TRIGGER `update_userNum_after_delete` AFTER DELETE ON `userrole` FOR EACH ROW BEGIN
    UPDATE role
    SET userNum = (
        SELECT COUNT(userId)
        FROM userrole
        WHERE userrole.roleId = OLD.roleId
    )
    WHERE roleId = OLD.roleId;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
