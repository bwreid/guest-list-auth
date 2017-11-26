const express = require('express')
const router = express.Router()
const Auth = require(`../controllers/auth.controller`)
const Controller = require(`../controllers/users.controller`)

router.get('/', Auth.isAuthenticated, Controller.index)
router.get('/:id', Auth.isAuthenticated, Controller.exists, Controller.show)
router.post('/', Auth.isAdmin, Controller.create)
router.put('/:id', Auth.isUser, Controller.exists, Controller.update)
router.delete('/:id', Auth.isAdmin, Controller.exists, Controller.destroy)

module.exports = router
