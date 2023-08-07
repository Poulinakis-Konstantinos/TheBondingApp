import Datepicker from "../components/Datepicker";
import Table from "../components/Table";
import { getMyBonds, getMyBondsLastFive, getMyBondsNextFive } from "../services/BookService";
import { useState, useEffect } from "react";
import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';





const Home = () =>  {

const [totalLastNextBonds, setTotalLastNextBonds] = useState([]);
const [bonds, setBonds] = useState([]);
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [selectedDate, setSelectedDate] = useState(new Date());
const [upcomingBonds, setUpcomingBonds] = useState([]);
const [maturedBonds, setMaturedBonds] = useState([]);


const getBondsByMaturityDate = (date) =>{
  var datestring = date.toISOString().substring(0, 10);
  try{
    setSelectedDate(new Date(date))
    setTotalLastNextBonds([])
    let allBonds = []
    getMyBondsNextFive(datestring).then((bond) => {setUpcomingBonds(bond.data); setTotalLastNextBonds(allBonds = bond.data)})
    getMyBondsLastFive(datestring).then((bond) => { 
    setMaturedBonds(bond.data);
    allBonds = allBonds.concat(bond.data); 
    sortByDate(allBonds);
    setTotalLastNextBonds(allBonds)})
  }catch(error){
    console.error(error)
  }
}

const sortByDate = (arr) =>{
  arr.sort(function(a,b){
    var c = new Date(a.bondMaturityDate);
    var d = new Date(b.bondMaturityDate);
    return c-d;
  });
  return arr;
}

  useEffect(() => {
    getMyBonds().then(({data}) => {
            sortByDate(data);
            setBonds(data);
          })
  }, []);

  useEffect(() => {  setBonds([]); setBonds(totalLastNextBonds) }
  , [totalLastNextBonds]);

  const generateDates = (referenceDate, daysOffset, count) => {
    const dates = [];
    if (count > 0) { 
      for (let i = 0; i < count; i++) {
        const date = new Date(referenceDate);
        date.setDate(referenceDate.getDate() + daysOffset + i);
        dates.push(date);
      }
    } else if (count < 0) { 
      for (let i = 0; i < Math.abs(count); i++) { 
        const date = new Date(referenceDate);
        date.setDate(referenceDate.getDate() + daysOffset - i); 
        dates.push(date);
      }
      dates.reverse();
    }
    return dates;
  };

  const columns = [
    {
        name: 'ISIN',
        selector: row => row.isin,
        cell: row => (<a href={"/Details/" + row.id} target="_blank" rel="noopener noreferrer"> {row.isin} </a> ),
    },
    {
        name: 'Maturity Date',
        selector: row => row.bondMaturityDate,
        sortable: true
    },
    {
        name: 'Issuer',
        selector: row => row.bondCounterParty.name,
    },
    {
      name: 'bondStatus',
      selector: row => row.bondStatus,
      cell: row => (<Badge bg={row.bondStatus == "active" ? "success" : "danger"}>{row.bondStatus}</Badge> ),
    },
    {
        name: 'Type',
        selector: row => row.type,
    },
    {
        name: 'Currency',
        selector: row => row.bondCurrency,
    },
    {
        name: 'CUSIP',
        selector: row => row.cusip,
    },
    {
      name: 'Coupon %',
      selector: row => row.couponPercent,
    },
    {
      name: 'Face Value',
      selector: row => row.faceValue,
    },
    {
      button: true,
      cell: () => (
          <>
            <Button variant="outline-success" size="sm" onClick={handleShow}>
              Redeem
            </Button>
  
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          </>
      )
    }
  ];
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <Container className="mt-5">
      <Tabs justify className="mb-3">
        <Tab eventKey="home" title="Urgent Bonds">
          <div className="d-flex align-items-center mb-3">
        <Datepicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          getBondsByMaturityDate= {getBondsByMaturityDate}
          className="form-control"
        />
          </div>
          <h2>Upcoming Bonds</h2>
          <Row xs={1} md={2} lg={5} className="g-4">
            {generateDates(selectedDate, 0, 5).map((date, index) => (
              <Col key={index}>
                <Card style={{ height: "15rem" }}> 
                  <Card.Header>{date.toDateString()}</Card.Header>
                  <Card.Body className="scrollable"> 
                    {upcomingBonds.length > 0 
                      ? upcomingBonds.filter(
                          (bond) =>
                            new Date(bond.bondMaturityDate).toDateString() ===
                            date.toDateString()
                        ).length > 0 
                        ? <ListGroup variant="flush"> 
                            {upcomingBonds
                              .filter(
                                (bond) =>
                                  new Date(bond.bondMaturityDate).toDateString() ===
                                  date.toDateString()
                              )
                              .map((bond, bondIndex) => (
                                <ListGroup.Item key={bondIndex}>
                                        <span>
                                        ISIN: <a href={"/Details/" + bond.id} style={{ color: 'blue', textDecoration: 'underline' }}>{bond.isin}</a> | Status: {bond.bondStatus}
                                    </span>
                                </ListGroup.Item>
                              ))}
                          </ListGroup>
                        : "No bonds on this date" 
                      : "No bonds on this date"} 
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
    
          <h2 className="mt-4">Matured Bonds</h2>
          <Row xs={1} md={2} lg={5} className="g-4">
            {generateDates(selectedDate, -1, -5).map((date, index) => (
              <Col key={index}>
                <Card style={{ height: "15rem" }}> 
                  <Card.Header>{date.toDateString()}</Card.Header>
                  <Card.Body className="scrollable">
                    {maturedBonds.length > 0 
                      ? maturedBonds.filter(
                          (bond) =>
                            new Date(bond.bondMaturityDate).toDateString() ===
                            date.toDateString()
                        ).length > 0 
                        ? <ListGroup variant="flush"> 
                            {maturedBonds
                              .filter(
                                (bond) =>
                                  new Date(bond.bondMaturityDate).toDateString() ===
                                  date.toDateString()
                              )
                              .map((bond, bondIndex) => (
                                <ListGroup.Item key={bondIndex} className={bond.bondStatus === "active" ? "active-bond" : ""}>

                                    <span>
                                        ISIN: <a href={"/Details/" + bond.id} style={{ color: 'darkred', textDecoration: 'underline' }}>{bond.isin}</a> | Status: {bond.bondStatus}
                                    </span>
                                </ListGroup.Item>
                              ))}
                          </ListGroup>
                        : "No bonds on this date" 
                      : "No bonds on this date"}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>
        <Tab eventKey="profile" title="All Bonds">
          <Datepicker getBondsByMaturityDate= {getBondsByMaturityDate} />
          <Table data={bonds} columns={columns}/>
        </Tab>
        <Tab eventKey="contact" title="Redeemed Bonds">
          Tab 3 content tabs plugin
        </Tab>
        <Tab eventKey="blog" title="Something else">
          {/* <Demo /> */}
        </Tab>
      </Tabs>
    </Container>

  )
}

export default Home;