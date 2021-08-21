import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import { Button, Container } from 'reactstrap';
import { Alert } from 'reactstrap';
import CarouselReact from "../collection elements/Carousel";

class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div style={{marginTop:"20px"}}>
            <Alert color="primary">
              Last added items:
            </Alert>

            <Alert color="info">
              Collections with the largest number of items:
            </Alert>

          </div>
        </Container>
      </div>
    );
  }
}

export default Home;