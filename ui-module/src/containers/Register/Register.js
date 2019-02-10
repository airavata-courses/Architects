import React, { Component } from 'react';
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Axios from 'axios'
import SERVER_URL from '../../static/Config/Config'
import classes from './Register.css'


class Register extends Component {
    state = {
        addProjectForm: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name : must be between 3 and 30 characters'
                },
                value: ''
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name : must be between 3 and 30 characters'
                },
                value: ''
            },
            userName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'User Name : must be between 3 and 30 characters'
                },
                value: ''
            },
            password: {
                elementType: 'password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password : must be between 6 and 30 characters '
                },
                value: ''
            },
            skills: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Skills : Enter comma seperated skills'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email : Enter a valid email ID'
                },
                value: ''
            },
            contactNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Contact Number : Enter a valid contact Number'
                },
                value: ''
            },
            userType: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'Select', displayValue: 'select' },
                        { value: 'freeLancer', displayValue: 'Free Lancer' },
                        { value: 'organization', displayValue: 'Organization' }
                    ]
                },
                value: ''
            }
        },
        errors: ""
    }

    registerHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.addProjectForm) {
            formData[formElementIdentifier] = this.state.addProjectForm[formElementIdentifier].value;
        }
        console.log(formData);
        Axios.post(SERVER_URL + '/register', formData)
            .then(response => {
                console.log("data posted")
                this.setState({
                    snackbarMessage: "Registration Sucessful"
                });
                this.setState({ showSnackbar: true });
                window.location.assign("/")
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    snackbarMessage: "Could not register"
                });
                this.setState({ showSnackbar: true });
                this.setState({ loading: false });
                this.setState({ errors: "Invaild Data entered" });
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.addProjectForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ addProjectForm: updatedOrderForm });
        this.setState({ errors: "" });
    }

    render() {
        const { errors } = this.state
        const formElementsArray = [];
        for (let key in this.state.addProjectForm) {
            formElementsArray.push({
                id: key,
                config: this.state.addProjectForm[key]
            });
        }

        let form = (
            <form onSubmit={this.registerHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success">Register</Button>
            </form>
        );

        return (

            <div className={classes.RegisterForm}>
                <div style={{ color: "red" }}>
                    {errors}
                </div>

                <h4>Join our family</h4>
                {form}
            </div>

        );
    }
}

export default Register;
