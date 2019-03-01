import React from 'react';
import { Row, Col} from 'antd';
import * as actions from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { Form, Input, Button } from 'antd';
import NewItem from './NewItemForm';

// item={this.props.item}
//   onSubmitBook={() => {
//         // props.dispatch(editBook(props.book.id, book))
//   }}

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
