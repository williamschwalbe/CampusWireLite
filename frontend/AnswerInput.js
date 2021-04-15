import React, {useState} from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

const AnswerInput = props => {
  const {selectedQuestion, setQ, setErrorMessage, triggerModal } = props
  const { id } = selectedQuestion
  const [newAnswer, setNewAnswer] = useState('')
  const submitAnswer = async () => {
    console.log(`this is the id: ${id}`)
    setQ({...selectedQuestion, answer: newAnswer})
    const {data, status} = await axios.post('api/questions/answer', { _id: id, answer:newAnswer})
    if (data.includes('ERROR') || status !== 200) {
      setErrorMessage('Submitting Your Answer')
      triggerModal()
    } else {
        console.log("post sent")
    }
  }
  return (
    <div>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea2">
          <Form.Label>Enter Answer Below</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={e => setNewAnswer(e.target.value)} />
        </Form.Group>
      </Form>
      <Button variant="outline-success" onClick={() => submitAnswer()}>
          Submit 
      </Button>

    </div>
  )
}

export default AnswerInput
