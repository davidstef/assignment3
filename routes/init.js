const db = require('../utils/db')
const express = require('express')
const router = express.Router()
const { SQL_CREATE_TABLES } = require('../sql')

router.get('/init', (req, res) => {
    db.query(SQL_CREATE_TABLES)
        .then(() => {
            res.send("SUCCESS")
        })
})
module.exports = router
