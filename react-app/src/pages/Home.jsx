import Datepicker from "../components/Datepicker";
import Table from "../components/Table";
import { getMyBonds, getMyBondsLastFive, getMyBondsNextFive } from "../services/BookService";
import { useState, useEffect } from "react";
import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab'

const columns = [
  {
      name: 'ISIN',
      selector: row => row.isin,
      cell: row => (<a href={"/Details/" + row.id} target="_blank" rel="noopener noreferrer"> {row.isin} </a> ),
  },
  {
      name: 'Maturity Date',
      selector: row => row.bondMaturityDate,
  },
  {
      name: 'Issuer',
      selector: row => row.bondCounterParty.name,
  },
  {
    name: 'bondStatus',
    selector: row => row.bondStatus,
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
    name: 'faceValue',
    selector: row => row.faceValue,
  }
];

const Home = () =>  {

const [totalLastNextBonds, setTotalLastNextBonds] = useState([]);
const [bonds, setBonds] = useState([]);


const getBondsByMaturityDate = (date) =>{
  var datestring = date.toISOString().substring(0, 10);
  setBonds([]);   setTotalLastNextBonds([])
  console.log("Checking",bonds,totalLastNextBonds)
  let k = []
  getMyBondsNextFive(datestring).then((bond) => {setTotalLastNextBonds(k = bond.data)})
  getMyBondsLastFive(datestring).then((bond) => { k = k.concat(bond.data); setTotalLastNextBonds(k)})

}

const ResetMyBonds = () =>{
  console.log("Rest Bonds here")
}

// useEffect(() => {
//   getMyBonds().then(({data}) => {
//           setBonds(data);
//         })
// }, []);

  useEffect(() => {
    getMyBonds().then(({data}) => {
            setBonds(data);
          })
  }, []);

  useEffect(() => { setBonds(totalLastNextBonds) }
  , [totalLastNextBonds]);

  return (
    <>
    <Datepicker getBondsByMaturityDate= {getBondsByMaturityDate} restBonds= {ResetMyBonds}/>
    <Table data={bonds} columns={columns}/>
    </>
    // <Container>
    //   <Nav justify variant="tabs" defaultActiveKey="/home">
    //     <Nav.Item>
    //       <Nav.Link >My Bonds</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="link-2">Link</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="disabled" disabled>
    //         Disabled
    //       </Nav.Link>
    //     </Nav.Item>
    //   </Nav>
    //   <Tab.Content>
    //         <Tab.Pane eventKey="link-1">This is for the first nav tab</Tab.Pane>
    //         <Tab.Pane eventKey="link-2">
    //           This is for the second nav tab
    //         </Tab.Pane>
    //         <Tab.Pane eventKey="disabled">
    //           I guess this is for the third nav tab
    //         </Tab.Pane>
    //       </Tab.Content>
    // </Container>

  )
}

export default Home;


