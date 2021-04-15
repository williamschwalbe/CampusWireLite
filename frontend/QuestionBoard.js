import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Col, Container, Row, Modal, Button,
} from 'react-bootstrap'
import QuestionList from './QuestionList'
import QuestionResponseCard from './QuestionResponseCard'
import AnswerInput from './AnswerInput'
import './style/QuestionBoard.css'
const QuestionBoard = props => {
  const [selectedQuestion, setQ] = useState({})
  const [username, setUsername] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [modalBody, setModalBody] = useState('')

  useEffect(async () => {
    try {
      const { data, status } = await axios.get('/account/currUser')
      if (data.includes('ERROR') || status !== 200) {
        handleShow()
      } else {
        console.log(data)
        setUsername(data)
      }
    } catch (err) {
      console.log(err)
      return err
    }
  }, [])

  const logoutUser = async () => {
    const {data, status} = await axios.post('/account/logout')
    if (data.includes('ERROR') || status !== 200) {
      setModalBody('In logging you out')
      handleShow()
    }
    console.log(data)
    setUsername('')

  }

  return (
    <Container className="backg text-success">
      <Row className="topRow">
        <Col className="col-8">
          Campuswire Lit
        </Col>
        {username
        && (
        <>
          <Col>
            {`Hi ${username}!`}
          </Col>
          <Col>
            <Button variant="outline-success" onClick={() => logoutUser()}>
              Log out
            </Button>
          </Col>
        </>
        ) }
      </Row>
      <Row>
        <Col>
          <QuestionList setErrorMessage={setModalBody} triggerModal={setShow} setSelectedQuestion={setQ} user={username} />
        </Col>
        <Col>
          <QuestionResponseCard question={selectedQuestion} currUser={username} />
          {username && <AnswerInput setErrorMessage={setModalBody} triggerModal={setShow} selectedQuestion={selectedQuestion} setQ={setQ} /> }
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {`Could Not Perform ${modalBody}`}
          </Modal.Title>
        </Modal.Header>
      </Modal>
    </Container>
  )
}

export default QuestionBoard
