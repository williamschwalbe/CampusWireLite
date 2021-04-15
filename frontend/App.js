import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import QuestionBoard from './QuestionBoard'
import Signup from './Signup'
import Login from './Login.js'

const App = () => (
  <Router>
    <Switch>
       <Route exact path="/">
         <QuestionBoard/>
       </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/signup">
        <Signup/>
      </Route>
    </Switch>
  </Router>
)
export default App
