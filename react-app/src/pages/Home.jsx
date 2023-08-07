import Datepicker from "../components/Datepicker";
import Table from "../components/Table";
import { getBondsByUserId, getBondsNextFive, getBondsLastFive } from "../services/BookService";
import { useState, useEffect } from "react";
import React from 'react'

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


const getBondsByMaturityDate = (date) =>{
  var datestring = date.toISOString().substring(0, 10);
   getBondsNextFive(datestring, 1).then((bond) => {setTotalLastNextBonds([...totalLastNextBonds, ...bond.data]);console.log(totalLastNextBonds)})
   getBondsLastFive(datestring, 1).then((bond) => {setTotalLastNextBonds([...totalLastNextBonds, ...bond.data]); console.log(totalLastNextBonds)})
}
  const [bonds, setBonds] = useState([]);

  useEffect(() => {
    getBondsByUserId().then(({data}) => {
            setBonds(data);
          })
  }, []);

  useEffect(() => {
            setBonds(totalLastNextBonds);
          }
  , [totalLastNextBonds]);

  return (
    <>
    <Datepicker getBondsByMaturityDate= {getBondsByMaturityDate}/>
    <Table data={bonds} columns={columns}/>
    </>
  )
}

export default Home;


