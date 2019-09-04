CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
    id serial PRIMARY KEY,
    title TEXT,
    body TEXT,
    created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
    updated_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
    user INTEGER NOT NULL, 
    FOREIGN KEY (user) REFERENCES users (id)
);
 

