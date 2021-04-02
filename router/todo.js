const express = require('express')
const router = express.Router()

const ToDo = require('../models/todo')


router.get('/',async (req, res) => {
  try {
    let todoList = await ToDo.find({})
    res.render('todo', {todoList: todoList})
  } catch {
    res.redirect('/')
  }
    
  
  
})
router.post('/', async (req, res) => {
  let todo = new ToDo({
    content: req.body.content
  })
  try {
    await todo.save()
    res.redirect('/')
  } catch(e) {
    res.render('todo', {todoList: todo, error: e})
  }
})

// Edit todo 
router.get('/:id', async (req, res) => {
  try {
    let todo = await ToDo.findById(req.params.id)
    res.render('todoEdit', {todo: todo})
    
  } catch {
    res.redirect('/')
  }
})
router.put('/:id', async (req, res) => {
  let newTodo
  try {
    newTodo = await ToDo.findById(req.params.id)
    newTodo.content = req.body.newContent
    
    await newTodo.save()
    res.redirect('/')
  } catch {
    if (newTodo == null) {
      console.log('null')
      res.redirect('/')
    } else {
      res.render('todoEdit', {todo: newTodo, error: 'Error updating'})
    }
  }
})
router.delete('/:id', async (req, res) => {
  try {
    delTodo = await ToDo.findById(req.params.id)
    await delTodo.remove()
    res.redirect('/')
  } catch {
    res.redirect('/')
  }
})

module.exports = router