import React from 'react';
import { Row, Col} from 'antd';
import * as actions from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { Form, Input, Button } from 'antd';
import NewItem from './NewItemForm';



class EditItem extends React.Component{
  state={
    item:{},
  }

  componentDidMount(){

  }
  render(){


    return(
      <div className = "edit-item" style={{background:"#F5F5F5"}}>
          <NewItem/>
      </div>
    );
  }
}






export default (EditItem);
