// new item or edit item change state

import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import {Button} from 'antd';

class DeleteModel extends React.Component{


  render(){

      return(
        <ModelContainer>
          <div className="deleteModel" id="modal" style={{width: "50%", margin:"20px", padding:"20px", }}>
            <h3 style={{textAlign:"center"}}>Are you sure you want to delete {this.props.id}: {this.props.name} ?</h3>
            <div style={{textAlign:"center"}}>
              <Button type="primary" htmlType="submit" style={{marginRight:"5px"}}>Submit</Button>

              <Button type="danger"
              style={{background:"#CC3333", color:"#FFFFFF"}}
              onClick={()=>{
                this.props.closeModel()
              }}>Cancel</Button>
            </div>


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

export default DeleteModel;
