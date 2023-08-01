import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Card } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { WiTrain } from "react-icons/wi";
import axios from "axios";
import { url } from "../App";
function Home() {
  const [trains, setTrains] = useState([]);


  const filteredTrains=()=>{
    trains.filter()
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`${url}`, {
      timeout: 20000,
    });
    // console.log(res.data.data)
    setTrains(res.data.data);
  };
  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <WiTrain /> Express Train Service
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="navbar-nav" /> */}
          {/* <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
      <Container className="text-center mt-5">
        {/* <h1>Welcome to BlogHub</h1> */}
        {/* <h5>Register to create your first blog.</h5> */}
        {/* <Button variant="primary">Learn More</Button> */}
        <div className="d-flex flex-wrap justify-content-center mt-5">
          {trains.map((train, index) => {
            if(train.departureTime.Hours!==0 && train.departureTime.Minutes>=30){
              return (
                <Card
              // bg={getRandomColor().toLowerCase()}
              key={index}
              style={{ width: "18rem", margin: "10px" }}
              // text={getRandomColor().toLowerCase() === 'light' ? 'dark' : 'white'}
            >
              <Card.Body>
                <Card.Title>{train.trainName}</Card.Title>
                <Card.Text>
                  <b>Train Number{" "}</b>:{" " + train.trainNumber}
                </Card.Text>
                <Card.Text>
                  <b>Available Seat in Sleeper{" "}</b>:{" " + train.seatsAvailable.sleeper+" seats"}
                </Card.Text>
                <Card.Text>
                  <b>Available Seat in AC{" "}</b>:{" " + train.seatsAvailable.Ac+" seats"}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Sleeper Price:{" " + train.price.sleeper + " Rs"}</ListGroup.Item>
                <ListGroup.Item>Ac Price:{" " + train.price.AC + " Rs"}</ListGroup.Item>
                {/* <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
              </ListGroup>
            </Card>
              )
            }
            else{
              {console.log(train.departureTime.Hours+" "+train.departureTime.Minutes)}
            }
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;
