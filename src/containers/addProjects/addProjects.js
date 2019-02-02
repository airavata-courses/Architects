import React, {Component} from 'react'
import  Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import SERVER_URL from '../../static/Config/Config'
import './addProjects.css'
import Axios from 'axios'
class Addproj extends Component{
    state = {
        addProjectForm: {
            projectName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Project Name'
                },
                value: ''
            },
            companyName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'CompanyName'
                },
                value: ''
            },
            numberOfPpl: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Number of people working on the project'
                },
                value: ''
            },
            numberofHours: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Number of hours to work on project'
                },
                value: ''
            },
            payPerHour: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pay per hour'
                },
                value: ''
            },
            projectDepartment: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Project Department'
                },
                value: ''
            },
            projectDescription: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Project Description'
                },
                value: ''
            },
            projectLocation: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter the city'
                },
                value: ''
            },
            projectLink: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Link for more info of your project'
                },
                value: ''
            },
            // deliveryMethod: {
            //     elementType: 'select',
            //     elementConfig: {
            //         options: [
            //             {value: 'fastest', displayValue: 'Fastest'},
            //             {value: 'cheapest', displayValue: 'Cheapest'}
            //         ]
            //     },
            //     value: ''
            // }
        }
    }

    addProjectHandler = ( event ) => {
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
        Axios.post(SERVER_URL,formData)
            .then( response => {
                console.log("data posted")
                this.props.history.push( '/' );
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
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
        this.setState({addProjectForm: updatedOrderForm});
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
            <form class="DefaultForm" onSubmit={this.addProjectHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success">Add Project</Button>
            </form>
        );
        return (
            <div className="Projects">
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default Addproj;