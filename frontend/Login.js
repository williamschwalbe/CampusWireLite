import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CoreForm from './CoreForm'

const Login = () => {
  return (
    <div>
      <CoreForm formMode="Login" postPath="/account/login" />
      Dont have an account?
      <Link to="/signup">
        Sign up here!
      </Link>
    </div>

  )
}

export default Login
