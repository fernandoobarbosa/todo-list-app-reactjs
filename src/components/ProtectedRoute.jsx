import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute ({
  component: Component,
  isAuthenticated,
  logout,
  login,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component logout={logout} login={login} />
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        }
      }}
    />
  )
}

export default ProtectedRoute
