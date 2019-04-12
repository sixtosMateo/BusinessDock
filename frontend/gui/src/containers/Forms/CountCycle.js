// list of item that dont match
// count items
import React from 'react';
import * as actions from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, InputNumber, Select} from 'antd';
import {DebounceInput} from 'react-debounce-input';
import serializeForm from 'form-serialize';

const FormItem = Form.Item;
const Option = Select.Option;

class CountCycle extends React.Component{

  state={
    query:'',
    confirmDirty: false
  }

  componentDidMount(){
    this.props.refreshItems()
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
      console.log(values)
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render(){
      const { getFieldDecorator } = this.props.form;
      const { items } = this.props
      return(
        <div className="count-cycle-component">
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              label="Scan Item">
              {getFieldDecorator('select-multiple', {
                rules: [
                  { required: true, message: 'Please select item!', type: 'array' },
                ],
              })(

                <Select mode="multiple" placeholder="Please select an item">
                {
                  items.map((item)=>{
                    return <Option key={item.barcode}
                                   value={item.barcode}>{item.name}
                            </Option>
                  })
                }
                </Select>
              )}
            </Form.Item>

            <FormItem>
              <Button type="primary" htmlType="submit" style={{marginRight:"5px"}}>Submit</Button>
              <Button type="danger" onClick={()=>this.props.history.push('/inventory/')} style={{background:"#e50000", color:"#e5e5e5"}}>Danger</Button>
            </FormItem>
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
