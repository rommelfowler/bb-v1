import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

// NOTE: withErrorHandler - HOC function that adds a check to component BurgerBuilder.
// NOTE: Annonymouse Class - class with no name

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    // NOTE: error pop returned by firebase
    // NOTE: Must create a property (this.variable) to be able to use componentWillUnmount method
    componentWillMount(){
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      })
      this.resInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({error: error});
      });
    }
    componentWillUnmount() {
      // console.log("Will UnMount", this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    errorConfirmedHandler = () => {
      this.setState({error: null});
    }
    // NOTE: {this.state.error.message} = message prop return by firebase
    render() {
      return (
        <Auxiliary>
          <Modal
          show={this.state.error}
          modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      );
    }
  }
}

export default withErrorHandler;
