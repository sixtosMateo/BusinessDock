import React from 'react';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import styled from 'styled-components';


class ItemModel extends React.Component{
  state = {

  };

  componentDidMount(){
    this.props.refreshItems()

  }

  render(){
      return(
        <ModelContainer>
          <div id="modal" style={{width: "75%",
            height:"60%",
            padding:"20px 20px 20px 20px",
            overflow:"auto"}}>
            <h1>Item Modal</h1>

          </div>
        </ModelContainer>

      );
    }
  }

  const ModelContainer= styled.div`
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: rgba(0,0,0,0.3);
  display:flex;
  align-items:center;
  justify-content: center;
  #modal{
    background: #f3f3f3
  }
  `

  const mapDispatchToProps = dispatch =>{
    return {
      refreshItems: () => dispatch(actions.reloadLocalItems()),
    }
  }

  const mapStateToProps = ({ItemReducer, AuthReducer}) =>{
    // return object is what you want to map into a property
    return {
      token: AuthReducer.token,
      items: ItemReducer.items,
    }
  }
  const WrappedItemForm = Form.create()(ItemModel)

  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WrappedItemForm));
