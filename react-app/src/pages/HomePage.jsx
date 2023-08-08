import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { hostNameUrl } from "../config/api";


const BondsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [upcomingBonds, setUpcomingBonds] = useState([]);
  const [maturedBonds, setMaturedBonds] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };



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
  }, [selectedDate]);

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
  

  return (
    <Container className="my-4">
      <div className="d-flex align-items-center mb-3">
        <Button
          className="me-3"
          variant="success"
          onClick={() => {
            setSelectedDate(new Date());
          }}
        >
          Today
        </Button>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
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
    </Container>
  );
  
};

export default BondsPage;
