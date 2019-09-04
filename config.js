const SESSION_SECRET = 'lhadhlsdalh';
const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = "postgres://postgres:postgres@localhost:5432/articlesdb";

module.exports = {
    PORT,
    CONNECTION_STRING,
    SESSION_SECRET
}