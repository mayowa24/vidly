import React, { Component } from 'react';
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
// import { registerUser } from '../services/userService';
// import { registerUser } from './../services/userService';

class Register extends Form {
    state = {
        data: { username: '', password: '', name: '' },
        errors: {}
    }

    schema = {
        username: Joi.string().email({ minDomanAtoms: 2 }).required().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Fullname')
    }

    doSubmit = async () => {
        try {
            const response = await userService.registerUser(this.state.data);
            // console.log(response);
            localStorage.setItem('token', response.headers['x-auth-token']);
            auth.loginWithJwt(response.headers['x-auth-token']);
            window.location = '/'
            // this.props.history.push('/');
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors }
                errors.username = ex.response.data;
                this.setState({ errors });
            };
        };
    }
    render() {
        return (<div>
            <h1>New User</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username", "email", "Enter your username")}
                {this.renderInput("password", "Password", "password", "Enter your password")}
                {this.renderInput("name", "Fullname", "text", "Enter your name")}
                {this.renderButton("Register")}
            </form>
        </div>
        );
    }
}

export default Register;
