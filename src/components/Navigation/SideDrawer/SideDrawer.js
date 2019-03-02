import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './SideDrawer.css';
  // If ur adding vars, make this an obj{}
const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return(
    <Auxiliary>
      <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')}>
          <div className={classes.Logo}>
            <Logo />

          </div>
          <nav>
            <NavItems/>
          </nav>
        </div>

    </Auxiliary>
  );
}

export default sideDrawer;
