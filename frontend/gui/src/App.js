import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
      <div className="appComponent">
        <Router>
          <CustomLayout>
              <BaseRouter/>
          </CustomLayout>
        </Router>


      </div>
    );
  }

}

  //on object we specify the property that we want to reference
  // onTryAutoSignUp is a dispatch
const mapDispatchToProps = dispatch =>{
    return {
        onTryAutoSignup: ()=> dispatch(actions.authCheckState())
    }
  }

export default connect(null, mapDispatchToProps)(App);
