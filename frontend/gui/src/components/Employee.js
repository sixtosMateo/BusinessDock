import React from 'react';
import axios from 'axios';
import { List, Input, Breadcrumb, Avatar, Icon} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import EmployeeAvatar from './EmployeeAvatar';


const Search = Input.Search;

class Employee extends React.Component{
  constructor(props) {
       super(props);
       this.componentWillReceiveProps = this.componentWillReceiveProps(props);
     }

  state ={
    articles:[]
  }

  componentWillReceiveProps(newProps){
    if(newProps.token){
      axios.defaults.headers = {
         "Content-Type": "application/json",
         Authorization: newProps.token,

      }

      axios.get('http://127.0.0.1:8000/api/employees/')
        .then(res => {
          this.setState({
            articles: res.data
          });
        })
    }


  }

  render(){
      return(
        <div className="employeeComponent">
          <Search
          placeholder="Search Employee"
          onSearch={value => console.log(value)}
          enterButton
          />

          <EmployeeAvatar data={this.state.articles} />
        </div>
      )

  }


}


const mapStateToProps = state =>{
  // return object is what you want to map into a property
  return {
    token: state.token
  }
}


export default withRouter(connect(mapStateToProps)(Employee));
