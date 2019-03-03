import React, { Component } from 'react';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import classes from './searchbar.css';
import SERVER_URL from '../static/Config/Config'
import { FormHelperText } from '@material-ui/core';


class searchbar extends Component {
  state = {
    searchString: "",
    postfromUser: [],
    postfromProjects: []
  }

  componentDidMount() {
    axios.get(SERVER_URL + '/find/')
      .then(res => {
        console.log(res);
        this.setState({
          postfromUser: res.data.ListfromUsers, //can use .slice method to get only a few
          postfromProjects: res.data.ListfromProjects
        })
      })
      .catch(error=>{
        console.log(error)
      })
  }
  SearchchangeHandler = (e) => {
    this.setState({
      searchString: e.target.value
    })
  }
  handleclick = (e) => {
    console.log(this.state.searchString);
    axios.get(SERVER_URL + '/find/?ftext=' + this.state.searchString)
      .then(res => {
        console.log(res);
        this.setState({
          postfromProjects: res.data.ListfromProjects,  //can use .slice method to get only a few
          postfromUser: res.data.ListfromUsers
        })
      })
      .catch(error=>{
        console.log(error)
      });

    e.preventDefault();
  }


  addProjectButtonClick=()=>{
    window.location.assign("/addProjects");
  }

  loginButtonClick=() => {
    window.location.assign("/login")
  }
  render() {
   // console.log("Pritnting url api server: "+ process.env.connectionString);
    const { postfromProjects } = this.state;
    const postList = postfromProjects.length ? (
      postfromProjects.map(post => {
        return (
          <div className={classes.Search} id={post._id}>
            <p>{post.projectName}</p>
            <p>{post.companyName}</p>
            <p>{post.numberOfPpl}</p>
            <p>{post.payPerHour}</p>
            <p>{post.projectDescription}</p>
            <p>{post.projectLocation}</p>
            <p>{post.projectDepartment}</p>
          </div>
        )
      }))
      : (
        <div className="center"> No projects to be displayed </div>
      );

    const { postfromUser } = this.state;
    const postList1 = postfromUser.length ? (
      postfromUser.map(post => {
        return (
          <div className={classes.Search} id={post._id}>
            <p>{post.firstName}</p>
            <p>{post.lastName}</p>
            <p>{post.email}</p>
            <p>{post.skills}</p> 
          </div>
        )
      }))
      : (
        <div className="center"> No Freelancers to be displayed </div>
      );

    return (
      <div className="container-fluid">
        <div className="row">
          <form onSubmit={this.handleclick}>
            <div className="Search">
              <div className={classes.Disp}>
                <TextField
                  onChange={this.SearchchangeHandler}
                  id="outlined-full-width"
                  label="Search"
                  style={{ margin: 8 ,width: "500px",marginLeft: 18}}
                  placeholder="Enter the name of Organization/Coder"
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <Button
                style={{
                  backgroundColor: "#3f51b5"
                }}
                onClick={this.handleclick}
                variant="contained"
                color="primary">
                Search
              </Button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <h4 className={classes.Center}>PROJECTS</h4>
          <div className={classes.Disp}>
            {postList}
          </div>
          <h4 className={classes.Center}> FREE LANCERS </h4>
          <div className={classes.Disp}>
          {postList1}
      </div>
        </div>
      </div>

    )
  }

}
export default searchbar;
