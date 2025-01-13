import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "~/assets/img/logo_uin.svg";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const MobileMenu = () => {
   const { module, init } = useSelector((e) => e.redux);
   const { openMobileMenu, daftarMasterBeasiswa } = module;
   const dispatch = useDispatch();

   const menuList = [
      { label: "Tentang", pathname: "/tentang" },
      { label: "Beasiswa", pathname: "/beasiswa" },
      { label: "Informasi", pathname: "/informasi" },
   ];

   const handleLogout = () => {
      const logoutUrl = `https://iam.ar-raniry.ac.id/realms/uinar/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent(location.href)}`;
      window.location.href = logoutUrl;
   };

   const clearRedux = () => {
      dispatch(setModule({ ...daftarMasterBeasiswa, openMobileMenu: false }));
   };

   return (
      <React.Fragment>
         <div className={`sidebar-info side-info ${openMobileMenu ? "info-open" : ""}`}>
            <div className="sidebar-logo-wrapper mb-25">
               <Row className="align-items-center">
                  <Col xl={8} xs={8}>
                     <div className="sidebar-logo">
                        <a href="index.html">
                           <img src={logo} alt="logo-img" />
                        </a>
                     </div>
                  </Col>
                  <Col xl={6} xs={4}>
                     <div className="sidebar-close-wrapper text-end">
                        <button className="sidebar-close side-info-close" onClick={() => dispatch(setModule({ ...module, openMobileMenu: false }))}>
                           <i className="fal fa-times" />
                        </button>
                     </div>
                  </Col>
               </Row>
            </div>
            <div className="sidebar-menu-wrapper fix">
               <div className="mobile-menu mean-container">
                  <div className="mean-bar">
                     <a href="#nav" className="meanmenu-reveal" style={{ right: 0, left: "auto", display: "inline" }}>
                        <span>
                           <span>
                              <span />
                           </span>
                        </span>
                     </a>
                     <nav className="mean-nav">
                        <div className="mean-bar">
                           <a href="#nav" className="meanmenu-reveal" style={{ right: 0, left: "auto", display: "inline" }}>
                              <span>
                                 <span>
                                    <span />
                                 </span>
                              </span>
                           </a>
                           <nav className="mean-nav" />
                        </div>
                        <ul style={{ display: "none" }}>
                           <Each
                              of={menuList}
                              render={(row) => (
                                 <li>
                                    <Link onClick={clearRedux} to={h.parse("pathname", row)}>
                                       {h.parse("label", row)}
                                    </Link>
                                 </li>
                              )}
                           />
                           {h.objLength(init) ? (
                              <React.Fragment>
                                 <li>
                                    <Link to="/profile" onClick={clearRedux}>
                                       Profile
                                    </Link>
                                 </li>
                                 <li>
                                    <a href="#" onClick={() => handleLogout()}>
                                       Logout
                                    </a>
                                 </li>
                              </React.Fragment>
                           ) : (
                              <li>
                                 <a
                                    href={`https://iam.ar-raniry.ac.id/realms/uinar/protocol/openid-connect/auth?client_id=${
                                       sso.clientId
                                    }&redirect_uri=${encodeURIComponent(location.href)}&response_mode=fragment&response_type=code&scope=openid`}>
                                    Login
                                 </a>
                              </li>
                           )}
                        </ul>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
         <div className={`offcanvas-overlay${openMobileMenu ? " overlay-open" : ""}`} />
      </React.Fragment>
   );
};
export default MobileMenu;
