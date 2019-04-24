/// for incoming, outgoing, cart, etc we need to display a Modal
// with the information of the item
import React from 'react';
import 'antd/dist/antd.css';
import { Button, Col, Row} from 'antd';
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

            <h1 style={{fontFamily: "Permanent Marker", textAlign:"center"}}>Item added to cart</h1>
            <Row  style={{background:"#FFFFFF"}}>
              <Col sm={12} md={12} lg={12} style={{}}>
                <h2 style={{color:"#5f9ea0", fontFamily: "Permanent Marker"}}>Name: {this.props.item.name}</h2>
                <h3>Barcode: {this.props.item.barcode}</h3>
                <h4>Instock: {this.props.item.inStockQty}</h4>
              </Col>
              <Col sm={12} md={12} lg={12} style={{}}>
                <img width={175} style={{margin:"0", padding:"0", position: "absolute",right: "0"}} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
              </Col>
            </Row>

            <Row style={{background:"#F5F5F5"}}>
              <Col sm={12} md={12} lg={12} style={{}}>
                <h4>Sale Price: {this.props.item.salePrice}</h4>
                <h4>Color: {this.props.item.color}</h4>
              </Col>
              <Col sm={12} md={12} lg={12} style={{}}>
                <h4>Department: {this.props.item.department}</h4>
                <h4>Age: {this.props.item.ageRequirement}</h4>
              </Col>
            </Row>

            <Row style={{}}>
              <Col style={{}}>
                <h4 style={{color:"#5f9ea0", fontFamily: "Permanent Marker"}}>Description:</h4>
                <p>
                  This section will be the decription of the item.
                </p>

              </Col>
            </Row>



            <Button type="danger"
            style={{background:"#CC3333", color:"#FFFFFF"}}
            onClick={()=>{
              this.props.closeItemModel()
            }}>Cancel</Button>

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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ItemModel));
