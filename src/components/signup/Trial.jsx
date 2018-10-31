import React from 'react';

class Trial extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			disabled: true,
			email: '',
			password: '',
			password_again: ''
		};
	}

	inputChanged = (e) => {
		let obj = {};
		obj[e.target.name] = e.target.value;
		this.setState(obj, this.checkValid);
	};

	checkValid = () => {
		let disabled = true;
		let passed = {
			email: false,
			password: true,
			password_again: true
		};

		if (
			/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
				this.state.email
			)
		) {
			passed.email = true;
		}

		if (passed.email && passed.password && passed.password_again) {
			disabled = false;
		}

		this.setState({
			disabled: disabled
		});
	};

	render() {
		return (
			<div className="text-center">
				Trial Component
				<hr />
				<div>
					<div>Email Address</div>
					<input type="text" name="email" value={this.state.email} onChange={this.inputChanged.bind(this)} />
				</div>
				<div>
					<div>Password</div>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.inputChanged.bind(this)}
					/>
				</div>
				<div>
					<div>Repeat your password</div>
					<input
						type="password"
						name="password_again"
						value={this.state.password_again}
						onChange={this.inputChanged.bind(this)}
					/>
				</div>
				<hr />
				<button onClick={this.props.onReset}>Back</button>
				<button disabled={this.state.disabled}>Submit</button>
			</div>
		);
	}
}
export default Trial;
