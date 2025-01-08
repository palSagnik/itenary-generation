import React, { useEffect, useState } from 'react' // Add useState
import { Container, Row, Navbar, Nav, Offcanvas, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "./Header.css"

const Header = () => {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!open)
  }

  useEffect(() => {
    window.addEventListener("scroll", isSticky)
    return ()=>{
      window.removeEventListener("scroll", isSticky)
    }
  })

  // sticky header
  const isSticky = (e) => {
    const header = document.querySelector('.header-section')
    const scrollTop = window.scrollY
    scrollTop >= 120 ? header.classList.add('is-sticky') :
    header.classList.remove('is-sticky')
  }

  return (
    <section className='header-section'>
      <Container>
        <Row>
          <Navbar expand="lg"> {/* Fixed typo in expand */}
            <Navbar.Brand>
              <NavLink to='/' className="text-decoration-none"> Wanderlust </NavLink>
            </Navbar.Brand>

            <Navbar.Toggle 
              aria-controls={`offcanvasNavbar-expand-lg`} 
              onClick={toggleMenu}
            >
              <i className={open ? "bi bi-x-lg" : "bi bi-list"}></i>
            </Navbar.Toggle>

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="start"
              show={open}
              onHide={() => setOpen(false)}
            >
              <Offcanvas.Header closeButton>
                <h1 className='logo'>Wanderlust</h1>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                  <Nav.Link as={NavLink} to="/about">About Us</Nav.Link>
                  <NavDropdown
                    title="Itinerary" 
                    id={`offcanvasNavbarDropdown-expand-lg`}
                  >
                    <NavDropdown.Item as={NavLink} to="/flights">Flights</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/hotels">Hotels</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/points_of_interest">Points Of Interest</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/weather">Weather Forecast</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>

            <div className='ms-md-4 ms-2'>
              <NavLink to="/book" className='btn btn-primary d-none d-sm-inline-block text-decoration-none'>
                Book Now
              </NavLink>
            </div>
          </Navbar>
        </Row>
      </Container>
    </section>
  )
}

export default Header