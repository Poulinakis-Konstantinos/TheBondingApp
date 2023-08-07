import Datepicker from "../components/Datepicker";
import Table from "../components/Table";
import { getMyBonds, getMyBondsLastFive, getMyBondsNextFive } from "../services/BookService";
import { useState, useEffect } from "react";
import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';





const Home = () =>  {

const [totalLastNextBonds, setTotalLastNextBonds] = useState([]);
const [bonds, setBonds] = useState([]);
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


const getBondsByMaturityDate = (date) =>{
  var datestring = date.toISOString().substring(0, 10);
  setTotalLastNextBonds([])
  let allBonds = []
  getMyBondsNextFive(datestring).then((bond) => {setTotalLastNextBonds(allBonds = bond.data)})
  getMyBondsLastFive(datestring).then((bond) => { 
    allBonds = allBonds.concat(bond.data); 
    sortByDate(allBonds);
    setTotalLastNextBonds(allBonds)})
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

  return (
    <Container className="mt-5">
      <Tabs justify className="mb-3">
        <Tab eventKey="home" title="Urgent Bonds">
          Tab 1 content
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


