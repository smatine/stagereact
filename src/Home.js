import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { Row, Col, Alert } from 'reactstrap';


class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          
          <Row>
            <Col>
            <Button color="link"><Link to="/annuaires">Manage Annuaire stage</Link></Button>
            </Col>
            <Col>
            
            </Col>
            <Col>
            
            </Col>
            <Col>
        
            </Col>
          </Row>


         

        </Container>
      </div>
    );
  }
}

export default Home;