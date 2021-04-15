import React, { useState } from 'react'
import axios from 'axios'
import { ListGroupItem, Button, Card } from 'react-bootstrap'

const Question = props => {
  const { questionText, author, answer, setQ, id } = props
  return (
    <>
      <ListGroupItem>
        <Button variant="light" onClick={() => setQ({questionText,author,answer, id})}>
          {questionText}
        </Button>
      </ListGroupItem>
    </>
  )
}

export default Question
