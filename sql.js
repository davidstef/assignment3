const SQL_ARTICLE_SHOW = 'SELECT id,title,body FROM articles'
const SQL_REGISTER = 'SELECT id FROM users WHERE username = $1'
const SQL_LOGIN = 'SELECT id,username,password FROM users WHERE username = $1'
const SQL_INSERT_ARTICLE = 'INSERT INTO articles(title,body,userid) VALUES($1,$2,$3)'
const SQL_UPDATE_ARTICLE = 'UPDATE articles SET  title = $1, body = $2 WHERE id = $3'
const SQL_EDIT_ARTICLE = 'SELECT id,title,body FROM articles WHERE id = $1'
const SQL_SELECT_ARTICLE = 'SELECT id,title,body FROM articles WHERE userid = $1'
const SQL_DELETE_ARTICLE = 'DELETE FROM articles WHERE id = $1'

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
module.exports = {
    SQL_CREATE_TABLES,
    SQL_ARTICLE_SHOW,
    SQL_REGISTER,
    SQL_LOGIN,
    SQL_INSERT_ARTICLE,
    SQL_UPDATE_ARTICLE,
    SQL_EDIT_ARTICLE,
    SQL_SELECT_ARTICLE,
    SQL_DELETE_ARTICLE
}
