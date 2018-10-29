import React from 'react';
import Avatar from '../shop/Avatar';

class Product extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			amount: 1
		};
	}

	addToShoppingCard = (product) => {
		this.props.onAddingToShoppingCart(product, this.state.amount);
	};

	handleChange(e) {
		this.setState({ amount: parseInt(e.target.value, 10) });
	}

	render() {
		return (
			<React.Fragment>
				<div className="container">
					<div className="card-deck mb-3 text-center">
						<div className="card mb-4 box-shadow">
							<div className="card-header">
								<h4 className="card-text">{this.props.product.title}</h4>
							</div>
							<div className="card-body">
								<Avatar>
									<img className="card-img-top" src={this.props.src} />
								</Avatar>
								<h1 className="card-title pricing-card-title">
									{this.props.product.price}
									<small class="text-muted">{this.props.product.currency}</small>
								</h1>
								<ul className="list-unstyled mt-3 mb-4">
									<input
										type="number"
										style={{ width: '40px' }}
										placeholder="1"
										value={this.state.amount}
										onChange={this.handleChange.bind(this)}
									/>
								</ul>
								<button
									type="button"
									className="btn btn-sm btn-outline-secondary"
									onClick={() => {
										this.addToShoppingCard(this.props.product);
									}}
								>
									add to cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Product;
