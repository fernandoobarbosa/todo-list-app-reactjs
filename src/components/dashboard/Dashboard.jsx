import React, { useEffect, useState } from 'react'
import Table from './Table'
import api from '../../services/api'
import Navbar from '../common/Navbar'
import { useHistory } from 'react-router-dom'
import Copyright from '../common/Copyright'
import { Box } from '@material-ui/core'
function Dashboard ({ logout, login, ...rest }) {
  const history = useHistory()
  const [userResponse, setUserResponse] = useState({})
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    userRequest()
  }, [])
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  }
  function userRequest () {
    api
      .get('/user', config)
      .then((result) => {
        setShowTable(true)
        setUserResponse(result.data[0])
      })
      .catch((err) => {
        setShowTable(false)
        logout()
      })
  }

  function toDoRequest (id) {
    api
      .put(
        '/task/' + id,
        {
          toDo: true
        },
        config
      )
      .then(function (response) {
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function inProgressRequest (id) {
    api
      .put(
        '/task/' + id,
        {
          inProgress: true
        },
        config
      )
      .then(function (response) {
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function doneRequest (id) {
    api
      .put(
        '/task/' + id,
        {
          done: true
        },
        config
      )
      .then(function (response) {
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function deleteRequest (id) {
    api
      .delete('/task/' + id, config)
      .then((result) => {
        window.location.reload()
      })
      .catch((err) => {})
  }

  function createRequest (name) {
    api
      .post(
        '/task/',
        {
          name: name
        },
        config
      )
      .then(function (response) {
        window.location.reload()
      })
      .catch(function (error) {
        logout()
        console.log(error)
      })
  }

  return (
    <section>
      <Navbar
        logout={logout}
        userRequest={userRequest}
        createRequest={createRequest}
      />
      <Table
        showTable={showTable}
        userResponse={userResponse}
        toDoRequest={toDoRequest}
        inProgressRequest={inProgressRequest}
        doneRequest={doneRequest}
        deleteRequest={deleteRequest}
      />
      <Box mt={8}>
        <Copyright />
      </Box>
    </section>
  )
}
export default Dashboard
