import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      location: ''
    }

    this.Copyright = this.Copyright.bind(this);
    this.SignIn = this.SignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleUser(this.state);
  }

  Copyright() {
      return (
        <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright ©Alex Tian '}
        <Link color="inherit" href="https://material-ui.com/">
          Coffee Run
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  SignIn() {
    const classes = makeStyles(theme =>({
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));
    
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Look For Coffee
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Name"
              label="Customer Full Name"
              name="name"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
              />
            <InputLabel id="location" name="location">Location</InputLabel>
            <Select
              labelId="location"
              id="location"
              value={this.props.location}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              name="location"
            >
              <MenuItem value='Galvanize' name="location">Galvanize, 44 Tehama Street</MenuItem>
            </Select>  
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
              >
              Join a Coffee Run!
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Find out About Us
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Start a Coffee Run!"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          {this.Copyright()}
        </Box>
      </Container>
    );
  }
  render () {
    return (
      <React.Fragment>
        {this.SignIn()}
      </React.Fragment>
    )
  }
}

export default CustomerForm;

