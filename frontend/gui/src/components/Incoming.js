// what happens when user wants to buy a new item: display a modal
// i think its best two have two separate table for incoming and outgoing tables
// display table when item is new ask user if they want to add new item
// when user finished scanning the value needs to disapear


import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import escapeRegExp from 'escape-string-regexp';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import IncomingItemAvatar from './avatar/IncomingAvatar';
import TotalTable from './cart/TotalTable';
import { Row, Col , Icon } from 'antd';
import Model from './general/ModelContainer';

class Incoming extends React.Component{
  state={
    boughtItems:[],
    query:'',
    cart:[],
    subTotal:0,
    tax:0,
    total:0,
    modelOpen: false
  }

  componentDidMount(){
    this.setItems()
  }

  setItems=()=>{
    let boughtItems =[];

    this.props.items.forEach(item=>{
      const singleItem = {...item}
      boughtItems = [...boughtItems, singleItem]
    })

    this.setState(()=>{
      return {boughtItems}
    });

  }

  getItem=(barcode)=>{
    const item = this.state.boughtItems.find(item => item.barcode === barcode)
    if(item){
      return item
    }
    return null
  }

  updateQuery=(query)=>{
      this.setState({
        query: query.trim()
      })

      if(this.state.query){
        this.openModel(this.state.query)
        this.addToCart(this.state.query)
      }

  }

  isDuplicateCart=(barcode)=>{
    let duplicate
    duplicate = this.state.cart.find(item=> item.barcode === barcode)
    return duplicate
  }

  addToCart=(barcode)=>{
    const tempBoughtItems = [...this.state.boughtItems]
    // item not found, we can use this to activate modal
    if(this.getItem(barcode) == null){
      return
    }

    if(this.isDuplicateCart(barcode)){
      this.increment(barcode)
      return
    }

    const index = tempBoughtItems.indexOf(this.getItem(barcode))
    const item = tempBoughtItems[index]

    item.quantity = 1;
    item.transactionType = "incoming"
    const price = item.purchasedPrice;
    item.tax = .0975;
    item.itemSaleTotal = price;

    this.setState(()=>{
      return { boughtItems: tempBoughtItems, cart:[...this.state.cart, item]}
    },
    ()=>{this.addTotal()}
  )

  }

  addTotal =()=>{
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.itemSaleTotal));
    const tempTax = subTotal * .0975;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;

    this.setState(()=>{
      return {
        subTotal,
        tax,
        total
      }
    })

  }

  increment = (barcode)=>{
    let tempCart =[...this.state.cart]
    const duplicateItem = tempCart.find(item=> item.barcode === barcode)
    const index = tempCart.indexOf(duplicateItem)
    const item = tempCart[index]

    item.quantity = item.quantity + 1;
    const sum = item.quantity * item.purchasedPrice;
    item.itemSaleTotal = sum;


    this.setState(()=>{
      return { cart:[...tempCart]}
    },
    ()=>{this.addTotal()})
  }

  decrement = (barcode)=>{
    let tempCart = [...this.state.cart]
    const selectedItem = tempCart.find(item=>item.barcode===barcode);

    const index = tempCart.indexOf(selectedItem)

    const item  = tempCart[index]

    item.quantity = item.quantity-1;

    if(item.quantity ==0){
      this.removeItem(barcode)
    }
    else{
      item.itemSaleTotal = item.quantity * item.salePrice;

      this.setState(()=>{
        return {cart:[...tempCart]}},
        ()=>{this.addTotal()}
      )
    }
  }

  removeItem=(barcode)=>{
    let tempItems = [...this.state.boughtItems];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.barcode !== barcode)

    const index =  tempItems.indexOf(this.getItem(barcode))
    let removedItem = tempItems[index]

  // this the overall products and setting the values to defaut

    removedItem.quantity = 0
    removedItem.itemSaleTotal = 0

    this.setState(()=>{
      return {
        cart:[...tempCart],
        product:[...tempItems]
      }
    },
    ()=> {this.addTotal()}
  )
  }

  clearCart=()=>{
      this.setState(()=>{
        return {cart:[]}
      },()=>{
        //callback function
        // new originalfresh copy of all the items rather than referencing
        // all the modify object are set to default
        this.setItems();
        this.addTotal();
      });
  }

  // openModel
  openModel=(query)=>{
    const product = this.getItem(query);

    if(product == null){
      this.setState(()=>{
        return { modelOpen:true}
      })
      console.log("hello")
    }
    else{
      this.setState(()=>{
        return { modelOpen:false}
      })
    }

  }

  closeModel=()=>{
    this.setState(()=>{
      return {modelOpen:false}
    })
  }

  render(){
      return(

        <div className="incomingComponent" >
          <Row>
            <Col span={12} style={{width:"50%"}}>
                <DebounceInput
                minLength={5}
                debounceTimeout={300}
                onClick={(event => event.target.select())}
                placeholder="Incoming: Scan Item"
                style={{width:"100%",border: "1px solid #ccc", font:"sans-serif"}}
                onChange={event =>
                  this.updateQuery(event.target.value)}/>

            </Col>

            {
              this.state.cart.length > 0 ?

              <Col span={12} style={{width:"50%", padding:"2px"}}>

                  <Col span={12} style={{padding:"1px", width:"50%"}}>
                    <Icon type="shopping-cart"
                          className="submit-cart"
                          onClick={()=>this.clearCart()}
                          style={{fontFamily: "Permanent Marker",
                                  color:"#00AF33",
                                  width:"3rem",
                                  border:"1px solid"}}/> <span style={{width:"5rem", color:"#00AF33"}}> Submit  </span>


                    <Icon type="delete"
                          className="empty-cart"
                          onClick={()=>this.clearCart()}
                          style={{fontFamily: "Permanent Marker",
                                  color:"#cc0000",
                                  width:"3rem",
                                  border:"1px solid"}}/> <span style={{width:"5rem",color:"#cc0000"}}> ClearCart </span>
                  </Col>

                  <Col span={12} style={{padding:"1px", width:"50%"}}>
                    <TotalTable
                      total={this.state.total}
                      subTotal={this.state.subTotal}
                      tax={this.state.tax}
                      clearCart={this.clearCart}/>
                  </Col>
              </Col>

              :
              ""
            }
          </Row>



          <IncomingItemAvatar
            data={this.state.cart}
            increment={this.increment}
            decrement={this.decrement}
          />



        </div>


      );
    }
}

//
// {
//   this.state.modelOpen ?
//
//     <Model/>
//     :
//     ""
// }

const mapStateToProps = state =>{
  // return object is what you want to map into a property
  return {
    items: state.items,
    isAuthenticated: state.token !== null

  }
}

const mapDispatchToProps = dispatch =>{
  return {
      onTryAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Incoming));
