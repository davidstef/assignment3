
const SQL_CREATE_TABLES = `
    CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        username VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        PRIMARY KEY (id)
    );
    
    CREATE TABLE IF NOT EXISTS articles (
        id serial PRIMARY KEY,
        title TEXT,
        body TEXT,
        created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
        updated_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
        userid INTEGER REFERENCES users (id)
    
    );
`
module.exports = {SQL_CREATE_TABLES}
