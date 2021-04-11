import React, { useState } from 'react'
import axios from 'axios'
import { ListGroupItem, Button, Card } from 'react-bootstrap'

const Question = props => {
  const {questionText, author, answer, setQ} = props
  const handleClick = () => {
      setQ({questionText,author,answer})
      console.log(`${questionText} clicked`)
  }
  return (
    <>
      <ListGroupItem>
        <Button variant="light" onClick={() => setQ({questionText,author,answer})}>
          {questionText}
        </Button>
      </ListGroupItem>
    </>
  )
}

export default Question