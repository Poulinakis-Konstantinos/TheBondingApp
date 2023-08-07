import Navigation from "../components/Navigation";
import Datepicker from "../components/Datepicker";
import Table from "../components/Table";
import { BookService } from "../services/BookService";
import { Container } from 'react-bootstrap';

import React from 'react'

const data = [
  {
      isin: "1SAFN5645",
      maturityDate: 2,
      clientName: 3,
      issuer: 4,
      type: 5,
      currency: 6,
      cusip: 7,
      id: 1
  },
]

const Home = () =>  {
  return (
    <Container>
      <Datepicker />
      <Table data={data} />
    </Container>
  );
};

export default Home;


