import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';

const orderSum = (props) => {
  // NOTE: This gets object of ingredients
  // NOTE: {{}} - JS object (outer: marking dynamic entry. inner: JS object)
  // This is the output: <li>Salad: 1</li>
  const ingredientSum = Object.keys(props.ingredients)
    .map(igKey => {
      return(
        <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>
      );
    });

  return(
    <Auxiliary>
      <h3>Your Order</h3>
      <p>Declicious burger with:</p>
      <ul>
        {ingredientSum}
      </ul>
      <p>Check out</p>
      <button>CANCEL</button>
      <button>CONTINUE</button>
    </Auxiliary>
  );
};

export default orderSum;
