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
                  <h5>Author:</h5>
                  <br/>
                  <p>{author}</p>
              </Card.Text>
              <Card.Text>
                  <h5>Answer:</h5>
                  <br/>
                  <p>{answer}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
          <Col>
          </Col>
      </Row>
    </Container>
    )
}

export default QuestionResponseCard
