import React, {Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSum extends Component {
  componentWillUpdate() {
    console.log('[OrderSum] WillUpdate');
  }
  render() {

    // NOTE: This gets object of ingredients
    // NOTE: {{}} - JS object (outer: marking dynamic entry. inner: JS object)
    // This is the output: <li>Salad: 1</li>
    const ingredientSum = Object.keys(this.props.ingredients)
      .map(igKey => {
        return(
          <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
        );
      });

    return(
      <Auxiliary>
        <h3>Your Order</h3>
        <p>Declicious burger with:</p>
        <ul>
          {ingredientSum}
        </ul>
        <p><strong>Total Price: </strong>{this.props.price.toFixed(2)}</p>
        <p>Check out</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </Auxiliary>
    );
  }

}


export default OrderSum;
