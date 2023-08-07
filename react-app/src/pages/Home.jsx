import Datepicker from "../components/Datepicker";
import Table from "../components/Table";
import { getMyBonds, getMyBondsLastFive, getMyBondsNextFive, redeemBondAxios } from "../services/BookService";
import { useState, useEffect, useContext } from "react";
import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import axios from "axios";
import { hostNameUrl } from "../config/api";
import DateContext from "../DateContext";
import "./home.css";
const Home = () =>  {

const [totalLastNextBonds, setTotalLastNextBonds] = useState([]);
const [bonds, setBonds] = useState([]);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const {selectedDate} = useContext(DateContext);
const [redeemedBondId, setRedeemedBondId] = useState(null);

const toggleShow = (bondId) => {
  setShow((prevShow) => ({
    ...prevShow,
    [bondId]: !prevShow[bondId],
  }));
};
// const [selectedDate, setSelectedDate] = useState(new Date());
const [upcomingBonds, setUpcomingBonds] = useState([]);
const [maturedBonds, setMaturedBonds] = useState([]);


// const getBondsByMaturityDate = (date) =>{
//   var datestring = date.toISOString().substring(0, 10);
//   try{
//     setSelectedDate(new Date(date))
//     setTotalLastNextBonds([])
//     let allBonds = []
//     getMyBondsNextFive(datestring).then((bond) => {setUpcomingBonds(bond.data); setTotalLastNextBonds(allBonds = bond.data)})
//     getMyBondsLastFive(datestring).then((bond) => { 
//     setMaturedBonds(bond.data);
//     allBonds = allBonds.concat(bond.data); 
//     sortByDate(allBonds);
//     setTotalLastNextBonds(allBonds)})
//   }catch(error){
//     console.error(error)
//   }
// }


useEffect(() => {
  const fetchData =  async () => {
      const datestring = selectedDate.toISOString().substring(0, 10);
    try {
      const upcomingResponse = await axios.get(`${hostNameUrl}/getMyBondsIn5days?date=${datestring}`);
      const maturedResponse = await axios.get(`${hostNameUrl}/getMyBondsBefore5Days?date=${datestring}`);
      setUpcomingBonds(upcomingResponse.data);
      setMaturedBonds(maturedResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [selectedDate, redeemedBondId]);


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
}, [selectedDate, redeemedBondId ]);

  // useEffect(() => {  setBonds([]); setBonds(totalLastNextBonds) }
  // , [totalLastNextBonds]);

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


  const redeemBond = (bondId) => {
    fetch(redeemBondAxios(bondId), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {

        console.error(error);
      });
    setRedeemedBondId(bondId);
    handleClose();
    setRedeemedBondId(bondId);
  };

  const columns = [
    {
        name: 'ISIN',
        selector: row => row.isin,
        cell: row => (<a href={"/Details/" + row.id} target="_self" rel="noopener noreferrer"> {row.isin} </a> ),
    },
    {
        name: 'Maturity Date',
        selector: row => row.bondMaturityDate,
        sortable: true
    },
    {
        name: 'Issuer',
        selector: row => row.bondCounterParty.name,
        style: { width: "150px", textOverflow: "ellipsis", overflow: "hidden" },
    },
    {
      name: 'bondStatus',
      selector: row => row.bondStatus,
      cell: row => (  <Badge bg={row.bondStatus == "active" ? "success" : "danger"}>
      {row.bondStatus == "active" ? row.bondStatus : "redeemed"}
    </Badge>),
    },
    {
        name: 'Type',
        selector: row => row.type,
    },
    {
        name: 'Currency',
        selector: row => row.bondCurrency,
        style: { width: "50px", textOverflow: "ellipsis", overflow: "hidden" },
    },
    {
        name: 'CUSIP',
        selector: row => row.cusip,
        style: { width: "50px", textOverflow: "ellipsis", overflow: "hidden" },
    },
    {
      name: 'Coupon %',
      selector: row => row.couponPercent,
      style: { width: "100px" },
    },
    {
      name: 'Face Value',
      selector: row => row.faceValue,
      style: { width: "100px" },
    },
    {
      button: true,
      cell: (row) => (
          <>
        {row.bondStatus === "active" && new Date(row.bondMaturityDate) <= selectedDate ? (
          <Button variant="outline-success" size="sm" onClick={() => toggleShow(row.id)}>
            Redeem
          </Button>
        ) : (
          <Button variant="outline-success" style={{ color: '#f09c92', borderColor: 'red' }} size="sm" onClick={handleShow} disabled>
            Redeem
          </Button>
        )}
  
          <Modal show={show[row.id]} onHide={() => toggleShow(row.id)}>
            <Modal.Header closeButton>
              <Modal.Title>Redeem Bond</Modal.Title>
            </Modal.Header>
            <Modal.Body>
          You are about to redeem the bond with ISIN {row.isin} and maturity date {row.bondMaturityDate}. Are you sure you want to do this?
        </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => toggleShow(row.id)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => redeemBond(row.id)}>
                Redeem Bond
              </Button>
            </Modal.Footer>
          </Modal>
          </>
      )
    }
  ];
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };


  return (
    <div className="outer-container">
    <Container className="my-4 inner-container">
      <Tabs justify className="mb-3">
        <Tab  eventKey="home" title="Urgent Bonds" className="mx-3 mb-5" >
          <div className="d-flex align-items-center mb-3">
        {/* <Datepicker
          selected={selectedDate}fre
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          getBondsByMaturityDate= {getBondsByMaturityDate}
          className="form-control"
        /> */}
          </div>
          <h2 className="my-3">Upcoming Bonds</h2>
          <Row xs={1} md={2} lg={5} className="g-4">
            {generateDates(selectedDate, 0, 5).map((date, index) => (
              <Col key={index}>
                <Card style={{ height: "15rem" }}> 
                <Card.Header style={{backgroundColor: index === 0 ? "#f05167" : index === 1 ? "#f2775e" : index === 2 ? "#f5964e" : index === 3 ? "#ffc66b" : index === 4 ? "#ffdf80" : "white"}}>{date.toDateString()}</Card.Header>
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
    
          <h2 className="my-3">Matured Bonds</h2>
          <Row xs={1} md={2} lg={5} className="g-4">
            {generateDates(selectedDate, -1, -5).map((date, index) => (
              <Col key={index}>
                <Card style={{ height: "15rem" }}> 
                <Card.Header style={{backgroundColor: index === 0 ? "#3e76de" : index === 1 ? "#3e99de" : index === 2 ? "#3eaede" : index === 3 ? "#4fdce0" : index === 4 ? "#49c4b0" : "white"}}>{date.toDateString()}</Card.Header>
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
        <Tab eventKey="a" title="All Bonds">
          {/* <Datepicker getBondsByMaturityDate= {getBondsByMaturityDate} /> */}
          <Table data={bonds} columns={columns} />
        </Tab>
        <Tab eventKey="x" title="Redeemed Bonds" >
        <Table data={bonds.filter(bond => bond.bondStatus !== 'active')} columns={columns}/>
        </Tab>
      </Tabs>
      </Container>
  </div>


  )
}

export default Home;