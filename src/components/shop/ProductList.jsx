import React from "react";
import Product from '../shop/Product';

class ProductList extends React.Component {
    addToShoppingCard = (product, amount) => {
        this.props.onProductSelectedForShoppingCard(product, amount);
    }

    render() {
        return (
            <div style={{backgroundColor: '#ffffff', padding: '20px'}}>
                Product list
                <hr/>
                <table>
                    <tbody>
                    {this.props.items.map(product => (
                        <tr key={`product-${product.id}`}>
                            <Product 
                                product={product} 
                                onAddingToShoppingCart={this.addToShoppingCard}>
                            </Product>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ProductList;
