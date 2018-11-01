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
		let repeat_passwordValid = this.state.repeat_passwordValid;

		switch (fieldName) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				fieldValidationErrors.email = emailValid ? '' : ' is invalid!';
				//console.log(this.state.email, emailValid);
				break;
			case 'password':
				passwordValid = value.length > 6;
				fieldValidationErrors.password = passwordValid ? '' : ' is too short!';
				//console.log(value, this.state.password, repeat_passwordValid);
				break;
			case 'repeat_password':
				repeat_passwordValid = value === this.state.password;
				fieldValidationErrors.repeat_password = repeat_passwordValid ? '' : ' dont match';
				//console.log(value, this.state.repeat_password, repeat_passwordValid);
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
				<h4>SignUp for Pro</h4>
				<hr />
				<FormErrors formErrors={this.state.formErrors} />
				<div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
					<label>Email address</label>
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
				<div id="pass" className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
					<label>Password</label>
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
					<label>Repeat Password</label>
					<input
						type="password"
						className="form-control"
						name="repeat_password"
						placeholder="Repeat Password"
						value={this.state.repeat_password}
						onChange={this.handleUserInput}
					/>
					<br />
				</div>
				<button className="btn btn-sm btn-outline-secondary" onClick={this.props.onReset}>
					Back
				</button>
				<button type="submit" className="btn btn-sm btn-success" disabled={!this.state.formValid}>
					submit
				</button>
				<hr />
			</div>
		);
	}
}

export default Pro;
