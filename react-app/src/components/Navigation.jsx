
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


function Navigation({ username,  handleLogout }) {
  return (
    <Navbar className="bg-body-secondary py-3">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/images/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Db logo"
          />
          <span className="ms-2">Bonds App</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="/" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
              Logout
            </Nav.Link>
          </Nav>
          <Navbar.Text className="d-flex align-items-center">
            <FontAwesomeIcon icon={faUserCircle} className="me-1" />
            <a href="/user">{username}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


export default Navigation;
