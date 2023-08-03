import Navigation from "../components/Navigation";
import Datepicker from "../components/Datepicker";
import Table from "../components/Table";

import React from 'react'

const data = [
  {
      isin: "1SAFN5645",
      maturityDate: 2,
      clientName: 3,
      issuer: 4,
      type: 5,
      currency: 6,
      cusip: 7
  },
  {
    isin: "2SAFN5645",
    maturityDate: 2,
    clientName: 3,
    issuer: 4,
    type: 5,
    currency: 6,
    cusip: 7
},
{
  isin: "3SAFN5645",
  maturityDate: 2,
  clientName: 3,
  issuer: 4,
  type: 5,
  currency: 6,
  cusip: 7,
  id: 1
}
]


const Details = () =>  {


  return (
    <>
    <Datepicker />
    <Table data={data}/>
    </>
  )
}

export default Details;


