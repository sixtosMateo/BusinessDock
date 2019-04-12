// list of item that dont match
// count items
import React from 'react';
import * as actions from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, InputNumber} from 'antd';
import {DebounceInput} from 'react-debounce-input';

const FormItem = Form.Item;

class CountCycle extends React.Component{

  state={
    query:'',
    confirmDirty: false
  }

  updateQuery=(query)=>{
      this.setState({
        query: query.trim()
      })
  }

  handleSubmit=(e)=>{
      e.preventDefault()
      const values = serializeForm(e.target, // e.target is the from itself
      {
        hash: true
      })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render(){
      const { getFieldDecorator } = this.props.form;
      return(
        <div className="count-cycle-component">
          <Form onSubmit={this.handleSubmit}>

          </Form>

        <DebounceInput
        minLength={5}
        debounceTimeout={300}
        onClick={(event => event.target.select())}
        placeholder="Scan Item Barcode"
        style={{width:"100%",border: "1px solid #ccc", font:"sans-serif"}}
        onChange={event =>
          this.updateQuery(event.target.value)}/>

        </div>

      )
  }
}


const mapStateToProps = ({ItemReducer,  AuthReducer}) =>{
  // return object is what you want to map into a property
  return {
    items: ItemReducer.items,
    isAuthenticated:  AuthReducer.token !== null

  }
}

const mapDispatchToProps = dispatch =>{
  return {
      refreshItems: () => dispatch(actions.reloadLocalItems())
  }
}

const WrappedItemForm = Form.create()(CountCycle);

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WrappedItemForm));
