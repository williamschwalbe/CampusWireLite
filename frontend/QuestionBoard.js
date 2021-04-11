import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Col, Container, Row, Modal, Form,
} from 'react-bootstrap'
import QuestionList from './QuestionList'
import QuestionResponseCard from './QuestionResponseCard'

const QuestionBoard = props => {
  const [selectedQuestion, setQ] = useState({})
  let username = ''
  const setSelectedQuestion = (q) => {
    console.log(q)
  }

  useEffect(async () => {
    try {
      username = await axios.get('/account/currUser').data
      console.log(username)//(`${username ? username : 'nobody'} is logged in `)
    } catch (err) {
      console.log(err)
      return err
    }
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          <QuestionList setSelectedQuestion={setQ} user={username} />
        </Col>
        <Col>
          <QuestionResponseCard question={selectedQuestion} currUser={username} />
        </Col>
      </Row>
    </Container>
    )
}

export default QuestionBoard
