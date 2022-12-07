GRANT ALL PRIVILEGES ON DATABASE test TO test;

CREATE TABLE IF NOT EXISTS todo( 
    id SERIAL PRIMARY KEY, 
    text VARCHAR(1000) NOT NULL, 
    is_completed INT NOT NULL
);

INSERT INTO todo (text, is_completed)
VALUES('Построить дом', 0);

INSERT INTO todo (text, is_completed)
VALUES('Посадить дерево', 0);

INSERT INTO todo (text, is_completed)
VALUES('Вырастить сына', 0);

