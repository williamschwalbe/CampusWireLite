const express = require('express')
const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/questions', async (req, res, next) => {
  try {
    await Question.find({}, (err, questions) => {
      if (err) {
        next(err)
      }
      if (questions) {
        res.send(questions)
        console.log("questions sent")
      } else {
        res.send('no questions')
      }
    })
  } catch {
    res.send('issue in getting questions')
  }
})

router.post('/questions/add', isAuthenticated, async (req, res) => {
  const {
    questionText, author, answer, _id,
  } = req.body
  try {
    await Question.create({
      questionText, author, answer, _id,
    })
    res.send(`${author} has succesfully created a question`)
  } catch (e) {
    res.send(`issue in creating question - ${questionText} has not been added to db `)
  }
})

router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
  const { _id, answer } = req.body
  try {
    await Question.findById({ _id }, (err, doc) => {
      if (err) {
        next(err)
      } else {
        doc.answer = answer
        doc.save()
        res.send(`${answer} has succesfully added`)
      }
    })
  } catch {
    res.send('issue in adding answer')
  }
})

module.exports = router
