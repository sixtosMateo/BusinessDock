import React from 'react';
import { Row, Col} from 'antd';
import * as actions from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { Form, Input, Button } from 'antd';
import NewItem from './NewItemForm';



class EditItem extends React.Component{

  componentDidMount(){
    this.props.refreshItems();
  }

  render(){
    console.log(this.props.match.params.barcode)

    return(
      <div className = "edit-item" style={{background:"#F5F5F5"}}>
          <NewItem
          item={this.props.item}
            onSubmitBook={() => {
                  // props.dispatch(editBook(props.book.id, book))
            }}
            />
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
    return {
      items: state.items,
      item: state.items.find((item) =>
            item.barcode === props.match.params.barcode)
    };
};

const mapDispatchToProps = dispatch =>{
  return {
      refreshItems: () => dispatch(actions.reloadLocalItems())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditItem));
