const express = require('express')

const ToDo = require('../models/todo')

module.exports = {
  index: async (req, res) => {
    try {
      let todoList = await ToDo.find({})
      res.render('todo', {todoList: todoList})
    } catch {
      res.redirect('/')
    }
    
  }, 
  add: async (req, res) => {
    let todo = new ToDo({
      content: req.body.content
    })
    try {
      await todo.save()
      res.redirect('/')
    } catch(e) {
      res.render('todo', {todoList: todo, error: e})
    }
  },
  
  // Edit todo 
  edit: async (req, res) => {
    try {
      let todo = await ToDo.findById(req.params.id)
      res.render('todoEdit', {todo: todo})
      
    } catch {
      res.redirect('/')
    }
  }, 
  update: async (req, res) => {
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
  }, 
  delete: async (req, res) => {
    try {
      delTodo = await ToDo.findById(req.params.id)
      await delTodo.remove()
      res.redirect('/')
    } catch {
      res.redirect('/')
    }
  }
}

