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
    const { postfromProjects } = this.state;
    const postList = postfromProjects.length ? (
      postfromProjects.map(post => {
        return (
          <div className={classes.Book} id={post._id}>
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
          <div className={classes.Book} id={post._id}>
            <p>{post.Name}</p>
            <p>{post.Age}</p>
          </div>
        )
      }))
      : (
        <div className="center"> No Freelancers to be displayed </div>
      );

    return (
      <div className="container-fluid">
        <div className="row">
          <div style={{
                display: "flex",
                marginLeft: "20px"    
              }}>

            <h1 >9to5IT
            </h1>
            <Button
              style={{
                backgroundColor: "#424242"
              }}
              onClick={this.addProjectButtonClick}
              variant="contained"
              color="primary">
              Add Projects
              </Button>
            <Button
              style={{
                backgroundColor: "#424242"
              }}
              onClick={this.loginButtonClick}
              variant="contained"
              color="primary">
              Login
              </Button>
            
          </div>

          <form onSubmit={this.handleclick}>
            <div className="Search">
              <div style={{ display: "flex" }}>
                <TextField
                  onChange={this.SearchchangeHandler}
                  id="outlined-full-width"
                  label="Search"
                  style={{ margin: 8 }}
                  placeholder="Enter the name of Organization/Coder"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
            </div>
            <div className={classes.Button}>
              <Button
                style={{
                  backgroundColor: "#424242"
                }}
                onClick={this.handleclick}
                variant="contained"
                color="primary">
                Search
              </Button>
            </div>
          </form>
        </div>
        <div>
          <h4 className="center">PROJECTS</h4>
          <div className={classes.Disp}>
            {postList}
          </div>
          <h4> FREE LANCERS </h4>
          {postList1}
        </div>
      </div>

    )
  }

}
export default searchbar;