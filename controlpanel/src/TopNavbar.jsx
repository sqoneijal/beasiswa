import lozad from "lozad";
import React, { useLayoutEffect } from "react";

const TopNavbar = ({ pageTypeButton }) => {
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
            <ul className="navbar-nav flex-row align-items-center ms-auto">
               <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <a className="nav-link dropdown-toggle hide-arrow p-0" href="#" data-bs-toggle="dropdown">
                     <div className="avatar avatar-online">
                        <img src="/assets/logo_uin.svg" alt="" className="rounded-circle lozad" />
                     </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                     <li>
                        <a className="dropdown-item mt-0 waves-effect" href="pages-account-settings-account.html">
                           <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 me-2">
                                 <div className="avatar avatar-online">
                                    <img src="../../assets/img/avatars/1.png" alt="" className="rounded-circle" />
                                 </div>
                              </div>
                              <div className="flex-grow-1">
                                 <h6 className="mb-0">John Doe</h6>
                                 <small className="text-muted">Admin</small>
                              </div>
                           </div>
                        </a>
                     </li>
                     <li>
                        <div className="dropdown-divider my-1 mx-n2"></div>
                     </li>
                     <li>
                        <a className="dropdown-item waves-effect" href="pages-profile-user.html">
                           <i className="ti ti-user me-3 ti-md"></i>
                           <span className="align-middle">My Profile</span>
                        </a>
                     </li>
                     <li>
                        <a className="dropdown-item waves-effect" href="pages-account-settings-account.html">
                           <i className="ti ti-settings me-3 ti-md"></i>
                           <span className="align-middle">Settings</span>
                        </a>
                     </li>
                     <li>
                        <a className="dropdown-item waves-effect" href="pages-account-settings-billing.html">
                           <span className="d-flex align-items-center align-middle">
                              <i className="flex-shrink-0 ti ti-file-dollar me-3 ti-md"></i>
                              <span className="flex-grow-1 align-middle">Billing</span>
                              <span className="flex-shrink-0 badge bg-danger d-flex align-items-center justify-content-center">4</span>
                           </span>
                        </a>
                     </li>
                     <li>
                        <div className="dropdown-divider my-1 mx-n2"></div>
                     </li>
                     <li>
                        <a className="dropdown-item waves-effect" href="pages-pricing.html">
                           <i className="ti ti-currency-dollar me-3 ti-md"></i>
                           <span className="align-middle">Pricing</span>
                        </a>
                     </li>
                     <li>
                        <a className="dropdown-item waves-effect" href="pages-faq.html">
                           <i className="ti ti-question-mark me-3 ti-md"></i>
                           <span className="align-middle">FAQ</span>
                        </a>
                     </li>
                     <li>
                        <div className="d-grid px-2 pt-2 pb-1">
                           <a className="btn btn-sm btn-danger d-flex waves-effect waves-light" href="auth-login-cover.html" target="_blank">
                              <small className="align-middle">Logout</small>
                              <i className="ti ti-logout ms-2 ti-14px"></i>
                           </a>
                        </div>
                     </li>
                  </ul>
               </li>
            </ul>
         </div>
      </nav>
   );
};
export default TopNavbar;
