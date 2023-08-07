// Navigation component
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from 'react'; // Import the useContext hook
import {DateContext} from '../DateContext';

function Navigation({ username, handleLogout }) {
  // Use the useContext hook to access the selected date and the setSelectedDate function from the DateContext value
  const { selectedDate, setSelectedDate } = useContext(DateContext);

  return (
    <Navbar className="bg-body-secondary py-3 header">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="\images\logo_square_rgb.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Db logo"
          />
          <span className="ms-2">Bonds App</span>
        </Navbar.Brand>
        <Nav.Link href="/" className="ms-2">Home</Nav.Link>
        <Nav.Link href="/myClients" className="ms-2">My Clients</Nav.Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {/* Pass the selected date and the setSelectedDate function as props to the datepicker component */}
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="form-control me-2"
            />
            <Nav.Link href="/" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "#133c7f" }} className="me-1" />
              <t style={{ color: "#133c7f" }}>Logout</t>
            </Nav.Link>
          </Nav>
          <Navbar.Text className="d-flex align-items-center">
            <FontAwesomeIcon icon={faUserCircle} style={{ color: "#133c7f" }} className="me-1" />
            <a href="/user" style={{ color: "#133c7f" }}>{username} </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;