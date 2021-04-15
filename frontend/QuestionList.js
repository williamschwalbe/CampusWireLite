import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {
  Col, Container, Row, Modal, Form, Button, ListGroup,
} from 'react-bootstrap'
import Question from './Question'

const QuestionList = props => {
  const { user, setSelectedQuestion, setErrorMessage, triggerModal } = props
  const [questionSet, setQuestionSet] = useState([])
  const [newQuestion, setNewQuestion] = useState('')
  const [sendToLogin, setSendToLogin] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(async () => {
    const intervalID = setInterval(async () => {
      const { data, status}  = await axios.get('/api/questions')
      if (data.includes('ERROR') || status !== 200) {
        setErrorMessage('Question Retreival')
        triggerModal()
      } else {
        console.log(data)
        setQuestionSet(data)
      }
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  const submitNewQuestion = async () => {
    try {
      const {data, status} =  await axios.post('/api/questions/add', { questionText: newQuestion, author: user, answer: '' })
      handleClose()
      if (data.includes('ERROR') || status !== 200) {
        setErrorMessage('Submitting Your Question')
        triggerModal()
      }
    } catch (err) {
          console.log(`an error has appeard in submitting users question ${err}`)
    }
  }
  if (sendToLogin) {
    return <Redirect to="/login" />
  }


  return (
    <Container>
      <Row>
        <Col>
          <Button variant="outline-success" onClick={user ? () => setShow(true) : () => setSendToLogin(true)}>
            {user ? 'Add a new Question' : 'Login to Submit a question'}
          </Button>
        </Col>
      </Row>
      <Row>
        <ListGroup>
          {questionSet.map(q => <Question key={q._id} questionText={q.questionText} author={q.author} answer={q.answer} setQ={setSelectedQuestion} id={q._id} />)}
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
