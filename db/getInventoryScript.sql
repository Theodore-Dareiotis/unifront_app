SELECT user_id AS rescuer, item_id AS itemId, category_id AS categoryId, item.name AS itemName, category.name AS categoryName, details
FROM item JOIN category ON category.id = category_id
JOIN in_inventory ON item.id = item_id
JOIN user ON user_id = user.id
ORDER BY user_id;