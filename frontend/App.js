import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import QuestionBoard from './QuestionBoard'
import CoreForm from './CoreForm'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <QuestionBoard />
        </Route>
        <Route exact path="/signup">
          <CoreForm formMode="Sign Up" postPath="/account/signup" />
        </Route>
        <Route exact path="/login">
          <CoreForm formMode="Login" postPath="/account/login" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
