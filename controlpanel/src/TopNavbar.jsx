import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const TopNavbar = ({ pageTypeButton }) => {
   const { init } = useSelector((e) => e.redux);

   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   return (
      <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
         <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
            <a className="nav-item nav-link px-0 me-xl-4" href="#">
               <i className="ti ti-menu-2 ti-md" />
            </a>
         </div>
         <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
            <div className="navbar-nav align-items-center">{pageTypeButton}</div>
            <Dropdown as="ul" bsPrefix="navbar-nav flex-row align-items-center ms-auto">
               <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <Dropdown.Toggle as="a" bsPrefix="nav-link dropdown-toggle hide-arrow p-0">
                     <div className="avatar avatar-online">
                        <img src="/assets/avatar.png" alt="" className="rounded-circle lozad" />
                     </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu as="ul" className="dropdown-menu dropdown-menu-end" renderOnMount={true}>
                     <li>
                        <a className="dropdown-item mt-0 waves-effect" href="pages-account-settings-account.html">
                           <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-2">
                                 <div className="avatar avatar-online">
                                    <img src="/assets/avatar.png" alt="" className="rounded-circle lozad" />
                                 </div>
                              </div>
                              <div className="flex-grow-1">
                                 <h6 className="mb-0">{h.parse("name", init)}</h6>
                              </div>
                           </div>
                        </a>
                     </li>
                     <li>
                        <div className="dropdown-divider my-1 mx-n2" />
                     </li>
                     <li>
                        <div className="d-grid px-2 pt-2 pb-1">
                           <a
                              className="btn btn-sm btn-danger d-flex waves-effect waves-light"
                              href={`https://keycloak.ar-raniry.ac.id/auth/realms/uinar/protocol/openid-connect/logout?redirect_uri=${window.location.origin}`}>
                              <small className="align-middle">Logout</small>
                              <i className="ti ti-logout ms-2 ti-14px" />
                           </a>
                        </div>
                     </li>
                  </Dropdown.Menu>
               </li>
            </Dropdown>
         </div>
      </nav>
   );
};
export default TopNavbar;
