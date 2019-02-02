import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Icon } from 'antd';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import NewEmployee from '../../containers/Forms/NewEmployeeForm';


class Model extends React.Component{
  render(){
      return(

          <ModelContainer>
            <div className="container">
                <Col>
                  <div id="modal">
                  <Row>
                    <h1>Hello world </h1>

                  </Row>
                  </div>
                </Col>
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

export default Model;
