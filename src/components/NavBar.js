import React,{useState} from "react";

function Navbar({ handleLoginClick1, handleLoginClick2 }) {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CNavbar expand="lg" colorScheme="light" className="bg-light">
        <CContainer fluid>
          <CNavbarBrand href="#">Navbar</CNavbarBrand>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav className="me-auto mb-2 mb-lg-0">
              <CNavItem>
                <CNavLink href="#" active>
                  Home
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Link</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#" disabled>
                  Disabled
                </CNavLink>
              </CNavItem>
            </CNavbarNav>
            <CForm className="d-flex">
              <CFormInput type="search" className="me-2" placeholder="Search" />
              <CButton type="submit" color="success" variant="outline">
                Search
              </CButton>
            </CForm>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  )
}

export default Navbar;
