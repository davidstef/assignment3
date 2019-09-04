const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const checkAuthorization = require('./utils/authorization')
const { PORT, SESSION_SECRET } = require('./config')
const userRoutes = require('./routes/users')
const indexRoutes = require('./routes/index')
const VIEWS_PATH = path.join(__dirname, '/views')
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache')
app.use('/css', express.static('css'))

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.locals.authenticated = req.session.user == null ? false : true
    next()
})

//setup routes:
app.use('/', indexRoutes)
app.use('/users', checkAuthorization, userRoutes)

app.listen(PORT, () => {
    console.log(`server has started on ${PORT}`)
})
