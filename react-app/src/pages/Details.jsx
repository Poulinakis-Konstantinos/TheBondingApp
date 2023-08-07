import Datepicker from "../components/Datepicker";
import Table from "../components/Table";
import {useParams} from 'react-router-dom';
import { useState, useEffect } from "react";
import React from 'react'
import { getTradesByUserAndBondId } from "../services/BookService";

const columns = [
  {
      name: 'Trade Type',
      selector: row => row.tradeType,
      // cell: row => (<a href={"/Details/" + row.id} target="_blank" rel="noopener noreferrer"> {row.isin} </a> ),
  },
  {
      name: 'Trade Currency',
      selector: row => row.tradeCurrency,
  },
  {
      name: 'Quantity',
      selector: row => row.quantity,
  },
  {
      name: 'Settlement Date',
      selector: row => row.tradeSettlementDate,
  },
  {
      name: 'Status',
      selector: row => row.tradeStatus,
  },
  {
      name: 'Trade Date',
      selector: row => row.tradeDate,
  },
  {
      name: 'Unit Price',
      selector: row => row.unitPrice,
  },
  {
    name: 'Trade CounterParty',
    selector: row => row.tradeCounterParty.name,
}
];

const Details = () =>  {
  const params  =  useParams()

  const [trades, setTrades] = useState([]);

  useEffect(() => {
    getTradesByUserAndBondId(params.bondId, 1).then(({data}) => {
      setTrades(data);
          })
  }, []);



  return (
    <>
    <Datepicker />
    <Table data={trades} columns={columns}/>
    </>
  )
}

export default Details;


