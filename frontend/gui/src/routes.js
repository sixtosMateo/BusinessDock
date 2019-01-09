import React from 'react';
import { Route } from 'react-router-dom';

import Login from './containers/Login';
import Welcome from './components/Welcome';
import Outgoing from './components/Outgoing';
import Incoming from './components/Incoming';
import Employee from './components/Employee';
import Inventory from './components/Inventory';
import Vendor from './components/Vendor';
import Report from './components/Report';
import NewItem from './containers/NewItemForm';
import NewEmployee from './containers/NewEmployeeForm'
import Items from './components/Items';
import DamageItem from './containers/DamageItem';
import NewVendor from './containers/NewVendorForm';



const BaseRouter = () =>(
  <div>
    <Route exact path='/' component={Welcome}/>{" "}
    <Route exact path='/login/' component={Login}/>{" "}
    <Route exact path='/outgoing/' component={Outgoing}/>{" "}
    <Route exact path='/incoming/' component={Incoming}/>{" "}
    <Route exact path='/employees/' component={Employee}/>{" "}
    <Route exact path='/employees/newEmployee/' component={NewEmployee}/>{" "}
    <Route exact path='/inventory/' component={Items}/>{" "}
    <Route exact path='/inventory/newItem/' component={NewItem}/>{" "}
    <Route exact path='/inventory/damageItem/' component={DamageItem}/>{" "}
    <Route exact path='/vendors/' component={Vendor}/>{" "}
    <Route exact path='/vendors/newVendor/' component={NewVendor}/>{" "}
    <Route exact path='/reports/' component={Report}/>{" "}

  </div>

);

export default BaseRouter;
