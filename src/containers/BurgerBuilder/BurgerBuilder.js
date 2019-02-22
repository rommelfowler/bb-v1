import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
// {} object
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  }
  // method
  updatePurchaseState(ingredients) {
    // Check purchaseable to true or false
    // const ingredients = {
    //   ...this.state.ingredients
    // };
    // Create an array of values from ingredients - these are numbers
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    })
    // Not flattening it. Turn it into a number: Sum of all ingredients
    // NOTE: Sum is the updated/current sum up until this iteration
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState({purchaseable: sum > 0}); //return true/false
  }
  addIngredHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const priceDeduct = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceDeduct;
    this.setState({
      totalPrice: newPrice,
      ingredients: updateIngredients
    });
    this.updatePurchaseState(updateIngredients);
  }

  removeIngredHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const priceDeduct = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduct;
    this.setState({
      totalPrice: newPrice,
      ingredients: updateIngredients
    });
    this.updatePurchaseState(updateIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }
  purchaseCancelHandler = () => {
    this.setState({purchasing:false});
  }
  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    // {salad: true, meat: false, ...}
    return(
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
          >
          <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
        <Burger
            ingredients={this.state.ingredients}
          />
        <BuildControls
            ordered={this.purchaseHandler}
            purchaseable={this.state.purchaseable}
            price={this.state.totalPrice}
            disabled={disableInfo}
            ingredientAdded={this.addIngredHandler}
            ingredientRemove={this.removeIngredHandler}
          />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
