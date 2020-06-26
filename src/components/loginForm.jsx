import React, { Component } from 'react';
// import Input from './input';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import Form from './common/form';
import Input from './common/input';
import auth from "../services/authService";
class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {}
    }
    // username = React.createRef();
    // password = React.createRef();

    // componentDidMount() {
    //     this.username.current.focus();
    // }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    doSubmit = async () => {
        //call the server
        try {
            const { data } = this.state;
            await auth.login(data.username, data.password)
            // localStorage.setItem('token', jwt);
            const { state } = this.props.location
            window.location = state ? state.from.pathname : '/' //full load application
            // this.props.history.push('/');
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors }
                errors.username = ex.response.data
                this.setState({ errors })
            }
        }

        // console.log('submitted');
    }
    // handleFocus = (autoFocus => {
    //     return autoFocus;
    // }

    render() {

        if (auth.getCurrentUser()) return <Redirect to="/" />
        // const { username, password } = this.state.data;
        // const focus = { autoFocus: true };
        return (
            <div className="row">
                <div className="col-8">
                    <h1>Login </h1>
                    <form onSubmit={this.handleSubmit} >
                        {this.renderInput("username", "Username", "email", "Enter your Email")}
                        {this.renderInput("password", "Password", "password", "Enter your password")}
                        {this.renderButton('Login')}
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;