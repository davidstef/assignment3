const db = require('../utils/db')
const express = require('express')
const router = express.Router()
const { SQL_INSERT_ARTICLE, SQL_UPDATE_ARTICLE, SQL_EDIT_ARTICLE, SQL_SELECT_ARTICLE, SQL_DELETE_ARTICLE } = require('../sql')

router.post('/delete-article', (req, res) => {
    const articleId = req.body.articleId

    db.none(SQL_DELETE_ARTICLE, [articleId])
        .then(() => {
            res.redirect('/users/articles')
        })
})

router.get('/add-article', (req, res) => {
    res.render('add-article')
})

router.post('/add-article', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const userId = +req.session.user.userId

    db.none(SQL_INSERT_ARTICLE, [title, description, userId])
        .then(() => {
            res.redirect('/users/articles')
        })
})

router.post('/update-article', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const articleId = +req.body.articleId

    db.none(SQL_UPDATE_ARTICLE, [title, description, articleId])
        .then(() => {
            res.redirect('/users/articles')
        })  
})

router.get('/articles/edit/:articleId', (req, res) => {
    const articleId = req.params.articleId

    db.one(SQL_EDIT_ARTICLE, [articleId])
        .then((articles) => {
            res.render('edit-article', articles)
        })
})

router.get('/articles', (req, res) => {
    const userId = req.session.user.userId

    db.any(SQL_SELECT_ARTICLE, [userId])
        .then((articles) => {
            res.render('articles', { articles: articles })
        })
})
module.exports = router
