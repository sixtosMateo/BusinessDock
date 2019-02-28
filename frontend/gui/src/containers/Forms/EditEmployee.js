import React from 'react';
import { Row, Col} from 'antd';
import * as actions from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { Form, Input, Button } from 'antd';
import NewEmployee from './NewEmployeeForm';




class EditEmployee extends React.Component{
  state={
    employee:'',
  }

  componentDidMount(){


  }
  render(){


    return(
      <div className = "edit-employee" style={{background:"#F5F5F5"}}>
          <NewEmployee/>
      </div>
    );
  }
}





export default EditEmployee;
