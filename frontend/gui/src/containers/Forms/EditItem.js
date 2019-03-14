import React from 'react';
import * as actions from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import NewItem from './NewItemForm';


class EditItem extends React.Component{

  render(){
    return(
      <div className = "edit-item" style={{background:"#F5F5F5"}}>
          <NewItem/>
      </div>
    );
  }
}

const mapStateToProps = ({ItemReducer}, props) => {
    return {
      items: ItemReducer.items,
      item: ItemReducer.items.find((item) =>
            item.barcode === props.match.params.barcode)
    };
};

const mapDispatchToProps = dispatch =>{
  return {
      refreshItems: () => dispatch(actions.reloadLocalItems())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditItem));
