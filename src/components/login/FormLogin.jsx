import { React, useState } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Copyright from '../common/Copyright'
import {
  Link,
  Grid,
  Box,
  Container,
  makeStyles,
  Typography,
  CssBaseline,
  TextField,
  Button,
  Avatar
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function FormularioCadastro ({ error, onSubmit, noError }) {
  const classes = useStyles()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit({ login, password })
          }}
        >
          <TextField
            value={login}
            onChange={(event) => {
              setLogin(event.target.value)
            }}
            id='login'
            label='Login'
            variant='outlined'
            fullWidth
            margin='normal'
            error={error.validation}
            onBlur={noError}
          />
          <TextField
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            id='password'
            label='Password'
            variant='outlined'
            fullWidth
            margin='normal'
            type='password'
            error={error.validation}
            helperText={error.message}
            onBlur={noError}
          />
          <Button type='submit' variant='contained' color='primary'>
            Login
          </Button>
          <Grid container>
            <Grid item xs />
            <Grid item>
              <Link href='/register' variant='body2'>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
