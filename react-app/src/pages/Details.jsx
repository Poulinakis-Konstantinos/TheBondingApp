import React, { useState, useEffect, useContext  } from 'react';
import { useParams } from 'react-router-dom';
import { getMyTradesByBondId, getBondByBondIdAndUserId } from "../services/BookService";
import Button from 'react-bootstrap/Button';
import Table from "../components/Table";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import DateContext from '../DateContext';
import { redeemBondAxios } from '../services/BookService';

const Details = () => {
  const params = useParams();
  const [trades, setTrades] = useState([]);
  const [bond, setBond] = useState(null);
  const {selectedDate} = useContext(DateContext);

  useEffect(() => {
    getMyTradesByBondId(params.bondId)
      .then(({ data }) => {
        setTrades(data);
      });

    getBondByBondIdAndUserId(params.bondId)
      .then(({ data }) => {
        setBond(data);
      });
  }, [params.bondId, selectedDate]);

  const isBondEligibleForRedemption = () => {
    return bond?.bondMaturityDate && new Date(bond?.bondMaturityDate) <= selectedDate && bond?.bondStatus.toLowerCase() === 'active';
  };

  const [showRedeemModal, setShowRedeemModal] = useState(false); 

  const handleRedeemModal = () => {
    setShowRedeemModal(!showRedeemModal);
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
      
    handleRedeemModal();
    window.location.reload();
  };

  return (
    <Container className ="my-4">
      {bond && (
        <Card style={bondDetailsStyle} className="mb-4">
          <Card.Header>
            <h5 className="mb-0"style={{ color: "#133c7f" }}>Bond Details</h5>
          </Card.Header>
          <Card.Body className="d-flex flex-column justify-content-between">
            <div>
              <Row className="mb-2">
                <Col xs={4} className="font-weight-bold">ISIN:</Col>
                <Col xs={8}>{bond.isin}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4} className="font-weight-bold">Maturity Date:</Col>
                <Col xs={8}>{bond.bondMaturityDate}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={4} className="font-weight-bold">Status:</Col>
                <Col xs={8} className="text-danger">{bond.bondStatus}</Col>
              </Row>
              <hr className="my-3" />
              <Row>
                <Col xs={12}>
                  <p>Coupon Percent: {bond.couponPercent}</p>
                  <p>Bond Currency: {bond.bondCurrency}</p>
                  <p>Face Value: {bond.faceValue}</p>
                  <p>Type: {bond.type}</p>
                  <p>Counter Party: {bond.bondCounterParty.name}</p>
                </Col>
              </Row>
            </div>
            <div className="text-center mt-3">
            <Button
              variant={isBondEligibleForRedemption() ? 'outline-primary' : 'outline-danger'}
              size="lg"
              disabled={!isBondEligibleForRedemption()}
              onClick={handleRedeemModal}
            >
              {isBondEligibleForRedemption() ? 'Trigger Redemption' : 'Not Eligible'}
            </Button>

            </div>
          </Card.Body>
        </Card>
      )}

      <h2 style={{ color: "#133c7f" }}>Transaction History</h2>
      <Table data={trades} columns={columns} />
      <Modal show={showRedeemModal} onHide={handleRedeemModal}>
        <Modal.Header closeButton>
          <Modal.Title >Trigger Redemption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to redeem the bond with ISIN {bond?.isin} and maturity date {bond?.bondMaturityDate}. Are you sure you want to do this?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRedeemModal}>
            Close
          </Button>
          <Button variant="primary" style={{ backgroundColor: "#133c7f", border: "white" }} onClick={() => redeemBond(bond?.id)}>
            Redeem Bond
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    
  );
}

const bondDetailsStyle = {
  boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
};



export default Details;




const columns = [
  {
    name: 'Trade Type',
    selector: row => row.tradeType,

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