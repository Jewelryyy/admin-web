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

 Date: 04/06/2024 16:31:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `level` int NOT NULL DEFAULT 1,
  `goodsNum` int NOT NULL DEFAULT 0,
  `unit` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `isEnabled` tinyint NOT NULL DEFAULT 1,
  `sortOrder` int NOT NULL DEFAULT 1,
  `parentId` int NOT NULL DEFAULT 0,
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`categoryId`) USING BTREE,
  INDEX `parentCategory`(`parentId` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (5, '服装', 1, 100, '件', 1, 1, 0, '服装');
INSERT INTO `category` VALUES (6, '手机数码', 1, 100, '件', 1, 1, 0, '手机数码');
INSERT INTO `category` VALUES (7, '家用电器', 1, 100, '件', 1, 1, 0, '家用电器');
INSERT INTO `category` VALUES (8, '家具家装', 1, 100, '件', 1, 1, 0, '家具家装');
INSERT INTO `category` VALUES (9, '汽车用品', 1, 100, '件', 1, 1, 0, '汽车用品');
INSERT INTO `category` VALUES (10, '电脑办公', 1, 0, '件', 1, 1, 0, '电脑办公');
INSERT INTO `category` VALUES (11, '外套', 2, 100, '件', 1, 1, 5, '外套');
INSERT INTO `category` VALUES (12, 'T恤', 2, 100, '件', 1, 1, 5, 'T恤');
INSERT INTO `category` VALUES (13, '休闲裤', 2, 100, '件', 1, 1, 5, '休闲裤');
INSERT INTO `category` VALUES (14, '牛仔裤', 2, 100, '件', 1, 1, 5, '牛仔裤');
INSERT INTO `category` VALUES (15, '衬衫', 2, 100, '件', 1, 1, 5, '衬衫');
INSERT INTO `category` VALUES (16, '手机通讯', 2, 100, '件', 1, 1, 6, '手机通讯');
INSERT INTO `category` VALUES (17, '手机配件', 2, 100, '件', 1, 1, 6, '手机配件');
INSERT INTO `category` VALUES (18, '摄影摄像', 2, 100, '件', 1, 1, 6, '摄影摄像');
INSERT INTO `category` VALUES (19, '影音娱乐', 2, 100, '件', 1, 1, 6, '影音娱乐');
INSERT INTO `category` VALUES (20, '数码配件', 2, 100, '件', 1, 1, 6, '数码配件');
INSERT INTO `category` VALUES (21, '电视', 2, 100, '件', 1, 1, 7, '电视');
INSERT INTO `category` VALUES (22, '空调', 2, 100, '件', 1, 1, 7, '空调');
INSERT INTO `category` VALUES (23, '洗衣机', 2, 100, '件', 1, 1, 7, '洗衣机');
INSERT INTO `category` VALUES (24, '冰箱', 2, 100, '件', 1, 1, 7, '冰箱');
INSERT INTO `category` VALUES (25, '厨卫大电', 2, 100, '件', 1, 1, 7, '厨卫大电');
INSERT INTO `category` VALUES (26, '厨房卫浴', 2, 100, '件', 1, 1, 8, '厨房卫浴');
INSERT INTO `category` VALUES (27, '灯饰照明', 2, 100, '件', 1, 1, 8, '灯饰照明');
INSERT INTO `category` VALUES (28, '五金工具', 2, 100, '件', 1, 1, 8, '五金工具');
INSERT INTO `category` VALUES (29, '卧室家具', 2, 100, '件', 1, 1, 8, '卧室家具');
INSERT INTO `category` VALUES (30, '客厅家具', 2, 100, '件', 1, 1, 8, '客厅家具');
INSERT INTO `category` VALUES (31, '全新整车', 2, 100, '件', 1, 1, 9, '全新整车');
INSERT INTO `category` VALUES (32, '车载电器', 2, 100, '件', 1, 1, 9, '车载电器');
INSERT INTO `category` VALUES (33, '维修保养', 2, 100, '件', 1, 1, 9, '维修保养');
INSERT INTO `category` VALUES (34, '汽车装饰', 2, 100, '件', 1, 1, 9, '汽车装饰');
INSERT INTO `category` VALUES (35, '平板电脑', 2, 100, '件', 1, 1, 10, '平板电脑');
INSERT INTO `category` VALUES (36, '笔记本', 2, 100, '件', 1, 1, 10, '笔记本');
INSERT INTO `category` VALUES (37, '硬盘', 2, 100, '件', 1, 1, 10, '硬盘');

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
) ENGINE = InnoDB AUTO_INCREMENT = 279 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `rolemenu` VALUES (263, 1, 2);
INSERT INTO `rolemenu` VALUES (264, 1, 5);
INSERT INTO `rolemenu` VALUES (265, 1, 6);
INSERT INTO `rolemenu` VALUES (266, 1, 7);
INSERT INTO `rolemenu` VALUES (267, 1, 12);
INSERT INTO `rolemenu` VALUES (268, 1, 13);
INSERT INTO `rolemenu` VALUES (269, 1, 14);
INSERT INTO `rolemenu` VALUES (270, 1, 15);
INSERT INTO `rolemenu` VALUES (271, 1, 16);
INSERT INTO `rolemenu` VALUES (272, 1, 17);
INSERT INTO `rolemenu` VALUES (273, 1, 3);
INSERT INTO `rolemenu` VALUES (274, 1, 8);
INSERT INTO `rolemenu` VALUES (275, 1, 9);
INSERT INTO `rolemenu` VALUES (276, 1, 4);
INSERT INTO `rolemenu` VALUES (277, 1, 10);
INSERT INTO `rolemenu` VALUES (278, 1, 11);

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
INSERT INTO `user` VALUES (1, 'admin', 'jewelry@foxmail.com', '123456', '2024-05-17 20:04:34', '2024-06-04 12:17:36', 1);
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
