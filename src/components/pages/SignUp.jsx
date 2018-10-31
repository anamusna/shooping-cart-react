import React from 'react';
import Pro from '../signup/Pro';
import Trial from '../signup/Trial';

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			signupType: null
		};
	}

	resetSignupType = () => {
		this.setState({ signupType: null });
	};

	render() {
		if (this.state.signupType === 'trial') {
			return <Trial onReset={this.resetSignupType} />;
		}

		if (this.state.signupType === 'pro') {
			return <Pro onReset={this.resetSignupType} />;
		}

		return (
			<div className="text-center">
				<div>
					<h4>How do you want to signup?</h4>
				</div>
				<button
					className="btn btn-sm btn-outline-secondary"
					onClick={() => {
						this.setState({ signupType: 'trial' });
					}}
				>
					Trial for free
				</button>
				<button
					className="btn btn-sm btn-outline-secondary"
					onClick={() => {
						this.setState({ signupType: 'pro' });
					}}
				>
					Pro for 100$
				</button>
			</div>
		);
	}
}
export default Signup;
