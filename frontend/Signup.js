import React from 'react'
import { Link } from 'react-router-dom'
import CoreForm from './CoreForm'

const Signup = () => {
  return (
    <div>
      <CoreForm formMode="Signup" postPath="/account/signup" />
      Already have an account?
      <Link to="/login">
        Log in here!
      </Link>

    </div>

  )
}

export default Signup
