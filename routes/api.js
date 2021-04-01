const express = require('express')
const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

const router = express.Router()


router.get('/questions', async (req, res) => {
  try {
      await Question.find({}, (err, questions) => {
          if(err){  //is this right way of doing it????????????
              next(err)
          }
          if(questions){
              res.send(questions)
              console.log("questions sent")
          } else {
              res.send("no questions")
          }
      }
      
  
  } catch {
    res.send('issue in getting questions')
  }
})

router.post('/questions/add', isAuthenticated, async (req, res) => {
  const { questionText, author, answer, _id } = req.body
  try {
      await Question.create({questionText, author, answer, _id })
      res.send(`${authoer} has succesfully created a question`)

  } catch {
    res.send(`issue in creating question - ${questionText} has not been added to db `)
  }
})

router.post('/questions/add', isAuthenticated, async (req, res) => {
  const { _id, answer} = req.body
  try {
      await Question.findByIdAndUpdate({ _id },{answer})
      res.send(`${answer} has succesfully added`)

  } catch {
    res.send('issue in adding answer')
  }
})

