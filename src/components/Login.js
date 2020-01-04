import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, type, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.login(formValues);
    }

    render() {
        return (
            <div>
                <h3>Register</h3>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="login" component={this.renderInput} label="Username" />
                    <Field name="password" type="password" component={this.renderInput} label="Password" />
                    <button className="ui button primary">Submit</button>
                </form>
            </div>
            
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.login) {
        errors.login = 'You must enter a username';
    }

    if (!formValues.password) {
        errors.password = 'You must enter a password';
    }

    return errors;
};

const loginForm = reduxForm({
    form: 'loginForm',
    validate
})(Login);

export default connect(null, { login })(loginForm);