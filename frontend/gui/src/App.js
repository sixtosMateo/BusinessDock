import React, { Component } from 'react';
import './App.css';

import CustomLayout from './containers/Layout';
import 'antd/dist/antd.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <CustomLayout>
        </CustomLayout>
      </div>
    );
  }
}

export default App;
