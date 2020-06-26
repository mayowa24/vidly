import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }
    validate = () => {

        const option = { abortEarly: false }
        const result = Joi.validate(this.state.data, this.schema, option)
        const { error } = result
        console.log(result);
        if (!error) return null;
        const errors = {}
        for (let item of error.details)
            errors[item.path[0]] = item.message;

        return errors;

        // const errors = {};
        // if (this.state.data.username.trim() === '') errors.username = "Username is required"
        // if (this.state.data.password.trim() === '') errors.password = "password is required"

        // return Object.keys(errors).length === 0 ? null : errors;

    }
    valideProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema)
        return error ? error.details[0].message : null;

        // if (!error) return null;
        // return error.details[0].message

        // if (input.name === "username") {
        //     if (input.value.trim() === '') return "username is required"
        // };
        // if (input.name === "password") {
        //     if (input.value.trim() === '') return "password is required"
        // };
    }
    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate()
        console.log(errors);
        this.setState({ errors: errors || {} });
        if (errors) return;

        // const username = this.username.current.value;
        // const password = this.password.current.value;
        this.doSubmit();
    }
    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors }
        const errorMessage = this.valideProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name]
        const data = { ...this.state.data }
        data[input.name] = input.value;
        this.setState({ data, errors })
    }

    renderInput(name, label, type = 'text', placeholder = '') {
        const { data, errors } = this.state;
        return <Input
            // autoFocus="autoFocus"
            // ref={this.username}
            label={label}
            name={name}
            value={data[name]}
            onChange={this.handleChange}
            type={type}
            placeholder={placeholder}
            error={errors[name]} />

    }
    renderButton(label) {
        return <button disabled={this.validate()} className="btn btn-primary m-2">{label}</button>
    }
    renderSelect(name, label, options) {
        const { data, errors } = this.state;
        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]} />

        );

    }
}

export default Form;