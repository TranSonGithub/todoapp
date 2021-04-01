const express = require('express')
const router = express.Router()

const ToDo = require('../models/todo')


router.get('/',async (req, res) => {
  try {
    let todoList = await ToDo.find({})
    res.render('todo', {todoList: todoList})
  } catch {
    res.redirect('/todos')
  }
    
  
  
})
router.post('/', async (req, res) => {
  let todo = new ToDo({
    content: req.body.content
  })
  try {
    let newTodo = await todo.save()
    res.redirect('/todos')
  } catch(e) {
    res.render('todo', {todoList: todo, error: e})
  }
  

})

module.exports = router