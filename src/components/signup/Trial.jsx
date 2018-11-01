import React from 'react';
import ErrorMessage from '../shared/ErrorMessage';

class Trial extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: 'aaa@aaa.de',
			password: '123456',
			password_again: '123456',
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
		let valid = false;
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
		} else {
			errors += errorMessages.password;
		}

		if (passed.email && passed.password) {
			valid = true;
		}

		this.setState({
			errors: errors
		});

		return valid;
	};

	submitDataWithGetRequest = () => {
		let params =
			'email=' +
			encodeURIComponent(this.state.email) +
			'&password=' +
			encodeURIComponent(this.state.password) +
			'&password_again=' +
			encodeURIComponent(this.state.password_again);
		let url = 'https://jsonplaceholder.typicode.com/todos/1?' + params;

		fetch(url).then((response) => response.json()).then((json) => {
			this.processResponse(json);
		});
	};

	submitDataWithPostRequest = () => {
		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				password_again: this.state.password_again
			})
		})
			.then((response) => response.json())
			.then((json) => {
				this.processResponse(json);
			});
	};

	processResponse = (json) => {
		if (json.hasOwnProperty('id')) {
			// Success
			document.location.reload();
		} else {
			this.setState({
				loading: false,
				errors: 'Internal Server Error'
			});
		}
	};

	submitData = () => {
		if (this.checkValid()) {
			this.setState({ loading: true });
			//this.submitDataWithGetRequest();
			this.submitDataWithPostRequest();
		}
	};

	render() {
		return (
			<div className="text-center">
				<h4>SignUp for Trial</h4>
				<br />
				{this.state.errors && <ErrorMessage message={this.state.errors} />}
				<hr />
				<div className="form-group">
					<label>Email Address</label>
					<input
						type="text"
						name="email"
						className="form-control"
						value={this.state.email}
						onChange={this.inputChanged}
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						name="password"
						className="form-control"
						value={this.state.password}
						onChange={this.inputChanged}
					/>
				</div>
				<div className="form-group">
					<label>Repeat your password</label>
					<input
						type="password"
						name="password_again"
						className="form-control"
						value={this.state.password_again}
						onChange={this.inputChanged}
					/>
				</div>
				<br />
				<button className="btn btn-sm btn-outline-secondary" onClick={this.props.onReset}>
					Back
				</button>
				<button className="btn btn-sm btn-success" onClick={this.submitData}>
					Submit
				</button>
				<hr />
			</div>
		);
	}
}
export default Trial;
