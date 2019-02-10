import React, { Component } from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from "axios";
import SERVER_URL from "../../static/Config/Config";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});



class Login extends Component {

    constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onChange(e) {
    console.log("changed")
    this.setState({ [e.target.name]: e.target.value });
    this.setState({errors:""});
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(this.state.email,this.state.password)
    axios
    .post(SERVER_URL+"/login", user)
    .then(res => {
      console.log("Inside server response" + res)
      localStorage.setItem('authToken', res.data.token)
      //localStorage.setItem('isAdmin', res.data.admin)
      window.location.assign('/')
    })
    .catch(err => {
      console.log(err)
     // localStorage.setItem('authToken', "")
     console.log(err.response)
      this.setState({ errors: "Invalid cerdentials"}) 
      //err.response.data""
      });

  }


render() {
  const { classes } = this.props
  const { errors }= this.state
  return (
    <main className={classes.main}>
      <CssBaseline />
      <div style={{color:"red"}}>
      {errors}
      </div>

      <div className="RegisterForm">
       
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email ID</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus 
             value={this.state.email}
             onChange={this.onChange}  />
            
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" 
             value={this.state.password}
             onChange={e => this.onChange(e)}
            />

          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
           style={{ 
              backgroundColor: "#3f51b5"
            }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => this.onSubmit(e)}
          >
            Sign in
          </Button>
          
          <Typography align="center" marginTop="120px">
            <a href="/register"> Not a member yet?</a>
          </Typography>
          
  
        </form>
      </div>
    </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
