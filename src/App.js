import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/login/Login'
import Dashboard from './components/dashboard/Dashboard'
import Register from './components/register/Register'

function App () {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.setItem('auth', false)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    if (localStorage.getItem('auth') === 'true') {
      login()
    } else {
      logout()
    }
  })

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact>
            {isAuthenticated ? (
              <Redirect to='/dashboard' />
            ) : (
              <Login
                isAuthenticated={isAuthenticated}
                logout={logout}
                login={login}
                component={Login}
              />
            )}
          </Route>
          <Route path='/register' exact>
            {isAuthenticated ? (
              <Redirect to='/dashboard' />
            ) : (
              <Register />

            )}
          </Route>
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            path='/dashboard'
            logout={logout}
            login={login}
            component={Dashboard}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
