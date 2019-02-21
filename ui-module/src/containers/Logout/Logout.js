import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      padding: theme.spacing.unit * 2,
      [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
        padding: theme.spacing.unit * 2,
      },
    },
    stepper: {
      // padding: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px`,
      marginLeft: "80px",
      marginRight: "100px",
      marginBottom: "25px"
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit,
    },
    logout: {
        marginLeft: "250px",
    
        marginTop: "30px",
        align: "center"
      }
  
  });

class Logout extends Component {

    
    componentWillMount() {
        //console.log("Calling component will mount logout")
    }

    componentDidMount() {
        //console.log("calling component did mount logout")
       // No need, issue: #68:  localStorage.removeItem('authToken');
       // localStorage.removeItem('isAdmin');
    }

    handleSearch(){
        window.location.assign('/');
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Thank you for using 9to5It
                        </Typography>
                        <React.Fragment>
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom align="center">
                                        Please visit us again
                                    </Typography>
                                    <div className={classes.logout}>
                                        <Button
                                          style={{ 
                                            backgroundColor: "#3f51b5"
                                            }}
                                            type="submit"
                                            alignItems="center"
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={this.handleSearch}
                                        >
                                            Go back home
                                        </Button>
                                    </div>
                                </React.Fragment>
                        </React.Fragment>
                    </Paper>
                </main>
            </div>
        )
    }
}

Logout.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Logout);