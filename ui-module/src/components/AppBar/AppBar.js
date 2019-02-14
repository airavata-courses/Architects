import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SvgIcon from "@material-ui/core/SvgIcon";
import logo from "./../../img/9to5IT.png";


const styles = {
  root: {
    flexGrow: 1,
    padding: "25px"
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  },

 AppBarButton: {
  textDecoration:"none",
  color: "white",
  marginLeft: "16px",
  padding: "8px"
},
 NavBar :{
  background: "#3f51b5"
}
};

const underlineText = (val) => {
  console.log(document.getElementById(val))
  document.getElementById(localStorage.getItem("currentPage")).setAttribute("style", "text-decoration:none");
  localStorage.setItem("currentPage", val);
  document.getElementById(val).setAttribute("style", "text-decoration-color: #ffea00;");
}

class DenseAppBar extends Component {
  componentDidMount() {
    console.log("DenseAppBAr mounted")
   // console.log(localStorage.getItem("currentPage"), "here");
    if (document.getElementById(localStorage.getItem("currentPage")) !== null) {
      document.getElementById(localStorage.getItem("currentPage")).setAttribute("style", "color: Orange");
    }

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.NavBar} position="static">
          <Toolbar>
            <Typography variant="h6"  style={{ flexGrow: "1",padding:"8px"}}>
              <a href="/"  >
              <img src={logo} alt="no preview" height="30px" width="100px"></img>
            </a>
              <a id="addProjects" href="/addProjects" className={classes.AppBarButton} onClick={() => underlineText("addProjects")}>
                Add Projects
            </a>
            </Typography>
            <Typography variant="h6" color="inherit">
              {localStorage.getItem("authToken") === null ? (
                <a id="login" href="/login" className={classes.AppBarButton}>
                  Login
              </a>
              ) : (
                  <a
                    id="logout"
                    href="/logout"
                    onClick={() => {localStorage.removeItem('authToken');}}
                    className={classes.AppBarButton}
                    style={{ display: "flex" }}
                  >
                    <div style={{ padding: "8px" }}>
                      <SvgIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          viewBox="0 0 18 18"
                        >
                          <path d="M9 1C4.58 1 1 4.58 1 9s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 2.75c1.24 0 2.25 1.01 2.25 2.25S10.24 8.25 9 8.25 6.75 7.24 6.75 6 7.76 3.75 9 3.75zM9 14.5c-1.86 0-3.49-.92-4.49-2.33C4.62 10.72 7.53 10 9 10c1.47 0 4.38.72 4.49 2.17-1 1.41-2.63 2.33-4.49 2.33z" />
                        </svg>
                      </SvgIcon>
                    </div>
                    <div style={{ padding: "8px" }}>Logout</div>
                  </a>
                )}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }


}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DenseAppBar);
