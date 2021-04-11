import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {
  Col, Container, Row, Modal, Form, Button, ListGroup,
} from 'react-bootstrap'
import Question from './Question'

const QuestionList = props => {
  const { user, setSelectedQuestion } = props
  const [questionSet, setQuestionSet] = useState([])
  const [newQuestion, setNewQuestion] = useState('')
  const [sendToLogin, setSendToLogin] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(async () => {
    try {
    //   const intervalID = setInterval(async () => {
    //     const qs = await axios.get('/api/questions')
    //     setQuestionSet(qs.data)
    //     console.log(qs.data[0].questionText)
    //   }, 2000)
    const qs = await axios.get('/api/questions')
    setQuestionSet(qs.data)
      return () => clearInterval(intervalID)
    } catch(err) {
      clearInterval(intervalID)
      return err
    }
  }, [])

  const submitNewQuestion = async () => {
    try{
      const sentQuestion =  await axios.post('/api/questions/add', { questionText: newQuestion, author: user, answer: '' })
      console.log(`the questions has been sent ${sentQuestion}`)
      } catch(err) {
          console.log(`an error has appeard in submitting users question ${err}`)
    }
  }


  return (
    <Container>
      {sendToLogin && <Redirect to="/login" />}
      <Row>
        <Col>
          <Button onClick={user ? () => setShow(true) : () => setSendToLogin(true)}>
            {user ? 'Add a new Question' : 'Login to Submit a question'}
          </Button>
        </Col>
      </Row>
      <Row>
        <ListGroup>
          {questionSet.map(q => <Question questionText={q.questionText} author={q.author} answer={q.answer} setQ={setSelectedQuestion} />)}
        </ListGroup>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Enter your question below
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Enter Question Below</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={e => setNewQuestion(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => submitNewQuestion()}>
            Submit your question
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default QuestionList
