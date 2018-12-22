import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import './App.css';

import CustomLayout from './containers/Layout';
import 'antd/dist/antd.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <CustomLayout>
              <BaseRouter/>
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

export default App;
