import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/modal'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const CoreForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { formMode, postPath } = props
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [reDirect, setRedirect] = useState(false)
  const modalBody = (formMode === 'Login' ? 'Please try re-entering your information it seems like you have made a mistake' : 'Please try re-entering your information it seems like your username is taken ')

  const submitUsernamePassWord = async () => {
    try {
      const {data, status} = await axios.post(postPath, { username, password })
      if (data.includes('ERROR') || status !== 200) {
        handleShow()
      } else{
        console.log(data)
        setRedirect(true)
      }
    } catch (err) {
      console.log(err)
      //handleShow()
    }
  }

  if (reDirect) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h1> {formMode}</h1>
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="button" onClick={() => submitUsernamePassWord()}>
          Submit
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Could Not Perform {formMode}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </div>

  )
}

export default CoreForm
