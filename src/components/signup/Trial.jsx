import React from 'react';
import ErrorMessage from '../shared/ErrorMessage';

class Trial extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			disabled: true,
			email: '',
			password: '',
			password_again: '',
			errors: ''
		};
		this.inputChanged = this.inputChanged.bind(this);
	}

	inputChanged = (e) => {
		let obj = {};
		obj[e.target.name] = e.target.value;
		this.setState(obj);
	};

	checkValid = () => {
		let disabled = true;
		let errors = '';
		let errorMessages = {
			email: 'Invalid email address.',
			password: 'Invalid password'
		};
		let passed = {
			email: false,
			password: false
		};

		if (this.state.email) {
			if (
				/^[a-z0-9][a-z0-9-_.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{1,70}(?:\.[a-z]{1,70})?$/.test(
					this.state.email
				)
			) {
				passed.email = true;
			} else {
				errors += errorMessages.email;
			}
		}

		// we need min. 6 chars
		if (this.state.password.length > 5 && this.state.password === this.state.password_again) {
			passed.password = true;
		}

		if (passed.email && passed.password) {
			disabled = false;
		}

		this.setState({
			disabled: disabled,
			errors: errors
		});
	};

	render() {
		return (
			<div className="text-center">
				<h2>Signup for Trial</h2>
				<br />
				{this.state.errors && <ErrorMessage message={this.state.errors} />}
				<hr />
				<div className="form-group">
					<label className="small">Email Address</label>
					<input
						required
						className="form-control"
						name="email"
						placeholder="Email"
						type="text"
						value={this.state.email}
						onBlur={this.checkValid}
						onChange={this.inputChanged}
					/>
				</div>
				<div className="form-group">
					<label className="small">Password</label>
					<input
						type="password"
						name="password"
						required
						className="form-control"
						placeholder="Password"
						value={this.state.password}
						onChange={this.inputChanged}
					/>
				</div>
				<div className="form-group">
					<label className="small">Repeat your password</label>
					<input
						type="password"
						name="password_again"
						required
						className="form-control"
						placeholder="Repeat Password"
						value={this.state.password_again}
						onChange={this.inputChanged}
					/>
				</div>
				<br />
				<button className="btn btn-secondary" onClick={this.props.onReset}>
					Back
				</button>
				<button className="btn btn-secondary" disabled={this.state.disabled}>
					Submit
				</button>
				<hr />
			</div>
		);
	}
}
export default Trial;
