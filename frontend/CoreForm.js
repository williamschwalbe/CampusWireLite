import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/modal'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

const CoreForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const formMode = props.formMode
  const postPath = props.postPath
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const (reDirect, setRedirect) = useState(false;)


  const submitUsernamePassWord = async () => {
    try {
      const { status } = await axios.post(postPath, { username, password }
      setRedirect(true)
    } catch(err) {
        handleShow()
    }
  }

  return (
  <div>
    { reDirect && (<Redirect to="/"/>) }
    <h1> {formMode}</h1>
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
  <Button variant="primary" type="submit" onSubmit={submitUsernamePassWord}>
    Submit
  </Button>
</Form>
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Could Not Perform {formMode}</Modal.Title>
        </Modal.Header>
        {(formMode=='Login') && <Modal.Body>Please try re-entering your information it seems like you have made a mistake</Modal.Body>}
        {(formMode != 'Login') && <Modal.Body>Please try re-entering your information it seems like your username is taken </Modal.Body> }
      </Modal>
  </div>

  )
}

export default CoreForm