const SESSION_SECRET = 'lhadhlsdalh';
const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = "postgres://postgres:postgres@localhost:5432/articlesdb";
const SALT_ROUNDS = 10

module.exports = {
    PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    SALT_ROUNDS
}
