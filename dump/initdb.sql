GRANT ALL PRIVILEGES ON DATABASE test TO test;

CREATE TABLE IF NOT EXISTS todos( 
    id SERIAL PRIMARY KEY, 
    text VARCHAR(1000) NOT NULL, 
    isCompleted INT NOT NULL
);

INSERT INTO todos (text, isCompleted)
VALUES('Построить дом', 0);

INSERT INTO todos (text, isCompleted)
VALUES('Посадить дерево', 0);

INSERT INTO todos (text, isCompleted)
VALUES('Вырастить сына', 0);

