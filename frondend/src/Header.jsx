import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "~/assets/img/logo_uin.svg";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const Header = () => {
   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   const menuList = [
      { label: "Tentang", pathname: "/tentang" },
      { label: "Beasiswa", pathname: "/beasiswa" },
      { label: "Informasi", pathname: "/informasi" },
   ];

   return (
      <header>
         <div className="h2_header-area header-sticky">
            <Container>
               <Row className="align-items-center">
                  <Col xl={3} sm={7} className="col-6">
                     <div className="h2_header-left">
                        <div className="h2_header-logo">
                           <Link to="/">
                              <img className="lozad" data-src={logo} alt="beasiswa uin ar-raniry" style={{ width: 132, height: 44 }} />
                           </Link>
                        </div>
                     </div>
                  </Col>
                  <Col xl={6} className="d-none d-xl-block">
                     <div className="h2_header-middle">
                        <nav className="h2_main-menu mobile-menu" id="mobile-menu" style={{ display: "block" }}>
                           <ul>
                              <Each
                                 of={menuList}
                                 render={(row) => (
                                    <li>
                                       <Link to={h.parse("pathname", row)}>{h.parse("label", row)}</Link>
                                    </li>
                                 )}
                              />
                           </ul>
                        </nav>
                     </div>
                  </Col>
                  <Col xl={3} sm={5} className="col-6">
                     <div className="h2_header-right">
                        <div className="h2_header-btn d-none d-sm-block">
                           <a href="#" className="header-btn theme-btn theme-btn-medium">
                              Sign Up
                           </a>
                        </div>
                        <div className="header-menu-bar d-xl-none ml-10">
                           <span className="header-menu-bar-icon side-toggle">
                              <i className="fa-light fa-bars" />
                           </span>
                        </div>
                     </div>
                  </Col>
               </Row>
            </Container>
         </div>
      </header>
   );
};
export default Header;
