import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import BaseRouter from './routes';
import * as actions from './store/actions/auth';
import CustomLayout from './containers/Layout';

import 'antd/dist/antd.css';


class App extends Component {
  componentDidMount(){
    //this is a dispatch method
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div>
        <Router>
          <CustomLayout {...this.props}>
              <BaseRouter/>
          </CustomLayout>
        </Router>
      </div>
    );
  }

}

  const mapStateToProps = state =>{
    // return object is what you want to map into a property
    return{
      isAuthenticated: state.token !== null
    }
  }

  //on object we specify the property that we want to reference
  // onTryAutoSignUp is a dispatch
  const mapDispatchToProps = dispatch =>{
    return {
        onTryAutoSignup: ()=> dispatch(actions.authCheckState())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps) (App);
