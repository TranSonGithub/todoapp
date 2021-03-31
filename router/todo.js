const express = require('express')
const router = express.Router()

const todoDb = require('../models/todo')

let todoList = [{id: 1, content: 'text'}]

router.get('/', (req, res) => {
  res.render('todo', {todoList: todoList})
})

module.exports = router