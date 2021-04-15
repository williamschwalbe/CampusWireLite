import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Col, Container, Row, Card,
} from 'react-bootstrap'
import QuestionList from './QuestionList'

const QuestionResponseCard = props => {
  const [newAnswer, setNewAnswer] = useState('')
  const {question} = props
  const {questionText, author, answer, id, currUser} = question


  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Question: {questionText}</Card.Title>
              <Card.Text>
                  <b>Author:</b>
                  <br/>
                  {author}
              </Card.Text>
              <Card.Text>
                  <b>Answer:</b>
                  <br/>
                  {answer}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    )
}

export default QuestionResponseCard
