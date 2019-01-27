import React from 'react';
import { Route} from 'react-router-dom';

import Login from './containers/Login';

// Components
import Welcome from './components/Welcome';
import Outgoing from './components/Outgoing';
import Incoming from './components/Incoming';
import Employee from './components/Employee';
import Inventory from './components/Inventory';
import Vendor from './components/Vendor';
import Report from './components/Report';


import Contact from './components/general/Contact';

// Forms
import NewItem from './containers/Forms/NewItemForm';
import NewEmployee from './containers/Forms/NewEmployeeForm'
import CountCycle from './containers/Forms/CountCycle';
import DamageItem from './containers/Forms/DamageItem';
import NewVendor from './containers/Forms/NewVendorForm';



const BaseRouter = () =>(
  <div>
    <Route exact path='/' component={Welcome}/>{" "}
    <Route exact path='/login/' component={Login}/>{" "}


    <Route exact path='/outgoing/' component={Outgoing}/>{" "}
    <Route exact path='/outgoing/editTransaction/' component={Outgoing}/>{" "}
    <Route exact path='/outgoing/deleteTransaction/' component={Outgoing}/>{" "}


    <Route exact path='/incoming/' component={Incoming}/>{" "}
    <Route exact path='/incoming/newItem/' component={Incoming}/>{" "}
    <Route exact path='/incoming/newVendor/' component={Incoming}/>{" "}
    <Route exact path='/incoming/editTransaction/' component={Incoming}/>{" "}
    <Route exact path='/incoming/deleteTransaction/' component={Incoming}/>{" "}


    <Route exact path='/employees/' component={Employee}/>{" "}
    <Route exact path='/employees/newEmployee/' component={NewEmployee}/>{" "}


    <Route exact path='/inventory/' component={Inventory}/>{" "}
    <Route exact path='/inventory/newItem/' component={NewItem}/>{" "}
    <Route exact path='/inventory/damageItem/' component={DamageItem}/>{" "}
    <Route exact path='/inventory/countCycle/' component={CountCycle}/>{" "}


    <Route exact path='/vendors/' component={Vendor}/>{" "}
    <Route exact path='/vendors/newVendor/' component={NewVendor}/>{" "}


    <Route exact path='/reports/' component={Report}/>{" "}
    <Route exact path='/reports/pdf/' component={Report}/>{" "}
    <Route exact path='/reports/graphs/' component={Report}/>{" "}

    <Route exact path='/contact/' component={Contact}/>{" "}

  </div>

);

export default BaseRouter;
