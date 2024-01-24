DROP TABLE IF EXISTS foods;

CREATE TABLE foods (
    foods_id SERIAL PRIMARY KEY,
    foods_name VARCHAR(30),
    foods_quantity NUMERIC,
    foods_hp_restored NUMERIC,
    foods_price NUMERIC
);