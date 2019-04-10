// new item or edit item change state
// have an db parameter determines whether its on the floor or not // backend work too

import React from 'react';
import { Input, Select,Button } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'
import * as actions from '../store/actions/auth';
import DamageItemAvatar from './avatar/DamageItemAvatar';

const Option = Select.Option;

class Damage extends React.Component{

  state ={
    query:  '',
    employeeId: 0,
  }

  componentDidMount(){
      this.props.refreshDamageItems();
      this.props.refreshEmployeeCombo();
  }

  handleChange=(value)=>{
    this.setState({
      employeeId: value,
    })
  }
  clearFilter(){
    this.setState({
      employeeId: 0,
    })
  }

  render(){

    let showingEmployees
    const { combinedEmployee } = this.props
      if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i')

        showingEmployees = combinedEmployee.filter((employee) =>
        match.test(employee.employeeId))
      }
      else{
        showingEmployees = combinedEmployee
      }
      showingEmployees.sort(sortBy('employeeId'))

      const {damageItem} = this.props
      let showingDamageItem

      if(this.state.employeeId !== 0){
        const match = new RegExp(escapeRegExp(this.state.employeeId.toString()), 'i')
        showingDamageItem = damageItem.filter((item) =>
        match.test(item.employeeId))
      }
      else{
        showingDamageItem = damageItem
      }
      showingDamageItem.sort(sortBy('barcode'))


      return(

        <div className="DamageItemComponent">
          <Button><Link to="/inventory/newDamageItem/">New damage</Link></Button>

          <Select showSearch
                  placeholder="Select a Employee"
                  style={{ width: 150, marginBottom:"20px" }}
                  onChange={this.handleChange}>
            {
              showingEmployees.map((employee)=>{
                return <Option key={employee.employeeId}
                               value={employee.employeeId}>{employee.first_name}{employee.last_name}
                        </Option>
              })
            }
          </Select>
          <Button onClick={()=>this.clearFilter()}>No filter</Button>

          <DamageItemAvatar data={showingDamageItem}/>
        </div>
      )
  }
}


const mapStateToProps = ({DamageItemReducer, CombinedEmployee, AuthReducer}) =>{
  // return object is what you want to map into a property
  return {
    combinedEmployee:  CombinedEmployee.combinedEmployee,
    damageItem: DamageItemReducer.damageItem,
    isAuthenticated:  AuthReducer.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return {
      refreshDamageItems: () => dispatch(actions.reloadDamageItems()),
      refreshEmployeeCombo: () => dispatch(actions.reloadEmployeeCombo()),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Damage));
