CREATE DATABASE online_shop;

CREATE TABLE categories (
	category_id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	category_name CHARACTER VARYING(50) NOT NULL UNIQUE
);

CREATE TABLE products (
	product_id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	product_name CHARACTER VARYING(50) NOT NULL UNIQUE,
	price BIGINT NOT NULL,
	short_desc CHARACTER VARYING(150) NOT NULL,
	long_desc CHARACTER VARYING(500) NOT NULL,
	image_path CHARACTER VARYING(100) NOT NULL,
	category_id SMALLINT NOT NULL REFERENCES categories(category_id)
);

CREATE TABLE users (
	user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username CHARACTER VARYING(50) NOT NULL,
	password CHARACTER VARYING(100) NOT NULL,
	contact CHARACTER VARYING(12) NOT NULL CHECK (contact ~* '^9989[012345789][0-9]{7}$') UNIQUE, 
	email CHARACTER VARYING(50) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$') UNIQUE,
	role CHARACTER VARYING(10) NOT NULL CHECK (role in ('admin', 'user'))
);

CREATE TABLE orders (
	order_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id, is_paid, order_created_at INT NOT NULL REFERENCES users(user_id),
	user_id, is_paid, order_created_at BOOLEAN NOT NULL,
	user_id, is_paid, order_created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE order_products (
	order_product_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	order_id INT NOT NULL REFERENCES orders(order_id),
	product_id SMALLINT NOT NULL REFERENCES products(product_id)
);

-- CREATE TABLE statistics (
-- 	paid_total_money BIGINT,
-- 	unpaid_total_money BIGINT,
-- 	most_sold_product CHARACTER VARYING()
-- );



INSERT INTO categories(category_name) VALUES 
('laptops'),
('phones'),
('books'),
('televisions'),
('game consoles');

INSERT INTO products (category_id, product_name, price, short_desc, long_desc, image_path) VALUES
(
	1, 'asus', 1500, 
	'Asus FX505D AMD R7-3750 DDR4 16GB/1TB+512GB HDD+SSD 6GB GTX 1660Ti Windows 10',
	'Asus FX505D AMD R7-3750 DDR4 16GB/1TB+512GB HDD+SSD 6GB GTX 1660Ti Windows 10 arzon narxlarda xarid qiling. Kreditsiz Asus FX505D AMD R7-3750 DDR4 16GB/1TB+512GB HDD+SSD 6GB GTX 1660Ti Windows 10 muddatli to''lov, kafolatli. O''zbekiston - bepul yetkaziladi',
	'/images/asus.jpg'
),
(
	2, 'samsung S21', 900, 
	'Samsung Galaxy S21 5G 8/128GB arzon narxlarda xarid qiling. Kreditsiz Samsung Galaxy S21 5G 8/128GB',
	'Samsung Galaxy S21 5G 8/128GB arzon narxlarda xarid qiling. Kreditsiz Samsung Galaxy S21 5G 8/128GB muddatli to''lov, kafolatli. O''zbekiston - bepul yetkaziladi',
	'/images/samsungs21.jpg'
),
(
	2, 'iphone 12 pro', 1200, 
	'Apple iPhone 12 Pro 256GB Graphite',
	'Apple iPhone 12 Pro 256GB Graphite arzon narxlarda xarid qiling. Kreditsiz Apple iPhone 12 Pro 256GB Graphite muddatli to''lov, kafolatli. O''zbekiston - bepul yetkaziladi',
	'/images/iphone12pro.jpg'
),
(
	3, 'O''tgan kunlar', 10, 
	'Abdulla Qodiriyning o''tgan kunlar asari',
	'Abdulla Qodiriyning O''tgan kunlar asari barcha uchun sevimli va mashxur asardir.',
	'/images/otgankunlar.jpg'
);


CREATE EXTENSION pgcrypto;

INSERT INTO users(username, password, contact, email, role) VALUES
('admin', crypt('admin', gen_salt('bf')), '998911240616', 'admin@gmail.com', 'admin'),
('Bahodir', crypt('0616', gen_salt('bf')), '998996050616', 'omonovbahodir0616@gmail.com', 'user'),
('Dilshodbek', crypt('0616', gen_salt('bf')), '998991234567', 'dilshod@gmail.com', 'user'),
('Dostonbek', crypt('0616', gen_salt('bf')), '998932845840', 'dostonbek@gmail.com', 'user');

INSERT INTO orders (user_id, is_paid, order_created_at) VALUES
(2, true, '2022-02-05'),
(2, false, '2022-02-08'),
(3, true, '2022-01-12'),
(3, false, '2021-11-18'),
(4, true, '2021-12-25');

INSERT INTO order_products(order_id, product_id) VALUES 
(1, 2), 
(1, 3), 
(2, 5), 
(2, 1), 
(3, 4), 
(3, 1), 
(4, 2), 
(5, 3); 






