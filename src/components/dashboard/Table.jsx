import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Alert from '@material-ui/lab/Alert'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    minWidth: 450,
    marginTop: 20
  }
})

export default function DenseTable ({
  userResponse,
  showTable,
  changeTask,
  toDoRequest,
  inProgressRequest,
  doneRequest,
  deleteRequest
}) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const classes = useStyles()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }

  // const handleChange = (event) => {
  //   console.log(event);
  // };

  const handleChangeToDo = (event) => {
    toDoRequest(event)
  }

  const handleChangeProgress = (event) => {
    inProgressRequest(event)
  }

  const handleChangeDone = (event) => {
    doneRequest(event)
  }

  const handleClick = (event) => {
    deleteRequest(event)
  }
  if (userResponse.tasks !== undefined) {
    return (
      <Paper className={classes.root}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size='small'
            aria-label='a dense table'
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell variant='head'>Task</TableCell>
                <TableCell>To Do</TableCell>
                <TableCell>In Progress</TableCell>
                <TableCell>Done</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {userResponse.tasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  // Ve se funciona e se te dá uma luz
                  <TableRow key={row._id} id={row._id}>
                    <TableCell component='td' scope='row'>
                      {index + 1}
                    </TableCell>
                    <TableCell component='td' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell component='td' scope='row'>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={row.toDo}
                            onChange={() => handleChangeToDo(row._id)} // Quando vc marcar esse check, vai printar o ID da row pq o id da row está vinculado a ela
                            name='toDo'
                            value
                          />
                        }
                      />
                    </TableCell>
                    <TableCell component='td' scope='row'>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={row.inProgress}
                            onChange={() => handleChangeProgress(row._id)}
                            name='inProgress'
                          />
                        }
                      />
                    </TableCell>
                    <TableCell component='td' scope='row'>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={row.done}
                            onChange={() => handleChangeDone(row._id)}
                            name='done'
                          />
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => handleClick(row._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component='div'
          count={userResponse.tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    )
  }

  return <Alert severity='info'>Processing!</Alert>
}
