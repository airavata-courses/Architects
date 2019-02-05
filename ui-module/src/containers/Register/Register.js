import React,{Component} from 'react';
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
                placeholder: 'First Name'
            },
            value: ''
        },
        lastName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Last Name'
            },
            value: ''
        },
        userName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'User Name'
            },
            value: ''
        },
        password: {
            elementType: 'password',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: ''
        },
        skills: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Skills'
            },
            value: ''
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Email'
            },
            value: ''
        },
        contactNumber: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Contact Number'
            },
            value: ''
        },
        userType: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'Select', displayValue: 'select'},
                    {value: 'freeLancer', displayValue: 'Free Lancer'},
                    {value: 'organization', displayValue: 'Organization'}
                ]
            },
            value: ''
        }
    }
  }

  registerHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.addProjectForm) {
        formData[formElementIdentifier] = this.state.addProjectForm[formElementIdentifier].value;
    }
    console.log(formData);
    // const order = {
    //     ingredients: this.props.ingredients,
    //     price: this.props.price,
    //     orderData: formData
    // }
    Axios.post(SERVER_URL + '/register', formData)
        .then(response => {
            console.log("data posted")
            this.setState({
                snackbarMessage: "Project has been added!"
            });
            this.setState({ showSnackbar: true });
            //this.props.history.push('/');
        })
        .catch(error => {
            console.log(error);
            this.setState({
                snackbarMessage: "Project name already exists!"
            });
            this.setState({ showSnackbar: true });
            this.setState({ loading: false });
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
}

  render() {
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
        <h4>Join our family</h4>
      {form}
  </div>
    );
  }
}

// Checkout.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default Register;
