const express = require('express')
const bcrypt = require ('bcrypt')
const router = express.Router()
const { SALT_ROUNDS } = require('../config')
const { SQL_ARTICLE_SHOW, SQL_REGISTER, SQL_LOGIN} = require('../sql')
const db = require('../utils/db')

router.get('/', (req, res) => {
    db.any(SQL_ARTICLE_SHOW)
        .then((articles) => {
            res.render('index', { articles: articles })
        })
})

router.get('/logout',(req,res,next) => {
    if(req.session){
        req.session.destroy((error) => {
            if(error) {
                next(error)
            } else {
                res.redirect('/login')
            }
        })
    }
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db.oneOrNone(SQL_REGISTER, [username])
        .then((user) => {
            if (user) {
                res.render('register', { message: "User name already exists!" })
            } else {
                bcrypt.hash(password, SALT_ROUNDS, function (error, hash) {
                    if (error == null) {
                        db.none('INSERT INTO users(username,password) VALUES($1,$2)', [username, hash])
                            .then(() => {
                                res.send('SUCCES')
                            })
                    }
                })
            }
        })
})

router.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password
    db.oneOrNone(SQL_LOGIN, [username])
        .then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, function (error, result) {
                    if (result) {
                        if (req.session) {
                            req.session.user = { userId: user.id, username: user.username }

                        }

                        res.redirect('/users/articles')
                    } else {
                        res.render('login', { message: "Invalid username or password" })
                    }
                })
            } else {
                res.render('login', { message: "Invalid username or password" })
            }
        })
})
module.exports = router
