import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

const modal = (props) => (
  <Auxiliary>
    <Backdrop
      show={props.show}
      clicked={props.modalClosed}
      />
      <div
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1': '0'
        }}
        className={classes.Modal}>
        {props.children}
      </div>
  </Auxiliary>
);

export default modal;
