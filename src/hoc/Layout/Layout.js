import React, {Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSlide: false
  }

  sideDrawCloseHandler = () => {
    this.setState({showSlide: false});
  }
  // NOTE: best  way to setState when getting the old state
  sideDrawerToggleHandler = () => {
    this.setState((prevState)=>{
      return {showSlide:!prevState.showSlide };
    });
  }
  render() {
    return (
      <Auxiliary>
        <div> Toolbar, Sidebar, Backdrop </div>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSlide} closed={this.sideDrawCloseHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Auxiliary>
    );
  }
}

export default Layout;
