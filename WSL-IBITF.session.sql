INSERT INTO Categories (id, name) VALUES 
(3, 'Electronics and Appliances'),
(4, 'Sports Equipment'),
(5, 'Food Products');

SELECT * FROM 

DESCRIBE Categories;

ALTER TABLE Categories
MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE Categories
MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


SELECT * FROM Categories

DELETE FROM Categories WHERE id=2

SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
        'id', id,
        'name', name
    )
) AS json_result
FROM Categories

SELECT * FROM Products
SELECT * FROM ProductCategory
SHOW DATABASES;

DELETE FROM Products WHERE id=13;