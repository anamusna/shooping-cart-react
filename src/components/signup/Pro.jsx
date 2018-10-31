import React from 'react';

class Pro extends React.Component {
	render() {
		return (
			<div className="text-center">
				<h4> Pro Component</h4>
				<button onClick={this.props.onReset}>Back</button>
			</div>
		);
	}
}
export default Pro;
