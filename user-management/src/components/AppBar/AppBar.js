import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SvgIcon from "@material-ui/core/SvgIcon";

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
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
    console.log(localStorage.getItem("currentPage"), "here");
    if (document.getElementById(localStorage.getItem("currentPage")) !== null) {
      document.getElementById(localStorage.getItem("currentPage")).setAttribute("style", "color: Orange");
    }

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar style={{ background: '#424242' }} position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{ flexGrow: "1" }}>
              <a href="/" className="AppBarButton" >
                Book Buddies
            </a>
              <a id="request" href="/request" className="AppBarButton" onClick={() => underlineText("request")}>
                Explore
            </a>
              <a id="share" href="/share" className="AppBarButton" onClick={() => underlineText("share")} >
                {/* <img src={ShareImg} alt="share icon" height="20px" width="20px"/> */}
                Share
            </a>
              <a id="profile" href="/profile" className="AppBarButton" onClick={() => underlineText("profile")}>
                {/* <img src={User} alt="no preview" height="20px" width="20px"></img> */}
                Profile
            </a>
              {localStorage.getItem("isAdmin") !== "false" && localStorage.getItem("isAdmin") !== null ? (
                <a id="admin" href="/admin" className="AppBarButton">
                  Admin
            </a>
              ) :
                (
                  null
                )}
            </Typography>
            <Typography variant="h6" color="inherit">
              {localStorage.getItem("authToken") === null ? (
                <a id="login" href="/login" className="AppBarButton">
                  Login
              </a>
              ) : (
                  <a
                    id="logout"
                    href="/logout"
                    className="AppBarButton"
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
