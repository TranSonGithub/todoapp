const mongoose = require('mongoose')
const todoSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId, 
  content: String
})

module.exports = new mongoose.model('todo', todoSchema)