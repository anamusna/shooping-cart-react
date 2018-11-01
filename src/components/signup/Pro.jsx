import React, { Component } from 'react';
import { FormErrors } from '../shared/FormErrors';

class Pro extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			formErrors: { email: '', password: '', repeat_password: '' },
			emailValid: false,
			passwordValid: false,
			formValid: false
		};
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => {
			this.validateField(name, value);
		});
	};

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let emailValid = this.state.emailValid;
		let passwordValid = this.state.passwordValid;

		switch (fieldName) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				fieldValidationErrors.email = emailValid ? '' : ' is invalid!';
				break;
			case 'password':
				passwordValid = value.length > 6;
				fieldValidationErrors.password = passwordValid ? '' : ' is too short!';
				break;
			default:
				break;
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				emailValid: emailValid,
				passwordValid: passwordValid
			},
			this.validateForm
		);
	}

	validateForm() {
		this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
	}

	errorClass(error) {
		return error.length === 0 ? '' : 'has-error';
	}

	render() {
		return (
			<div className="text-center">
				<h2>Sign up for Pro</h2>
				<FormErrors formErrors={this.state.formErrors} />
				<div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						required
						className="form-control"
						name="email"
						placeholder="Email"
						value={this.state.email}
						onChange={this.handleUserInput}
					/>
				</div>
				<div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						className="form-control"
						name="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.handleUserInput}
					/>
				</div>

				<div className={`form-group ${this.errorClass(this.state.formErrors.repeat_password)}`}>
					<label htmlFor="password">Repeat Password</label>
					<input
						type="password"
						className="form-control"
						name="repeat password"
						placeholder="Repeat Password"
						value={this.state.repeat_password}
						onChange={this.handleUserInput}
					/>
				</div>
				<button className="btn btn-secondary" onClick={this.props.onReset}>
					Back
				</button>
				<button type="submit" className="btn btn-secondary" disabled={!this.state.formValid}>
					submit
				</button>
				<hr />
				<div className="panel panel-default" />
			</div>
		);
	}
}

export default Pro;
