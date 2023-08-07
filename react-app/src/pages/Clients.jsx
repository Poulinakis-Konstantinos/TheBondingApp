import React, { useState, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { getMyClients } from '../services/BookService'; // Update the import statement

function Client() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getMyClients()
      .then(({ data }) => {
        setClients(data);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  return (
    <Container className="my-4">
      <h2>My Clients</h2>
      <ListGroup className ="my-3">
        {clients.map((client, index) => (
          <ListGroup.Item key={index}>{client}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Client;
