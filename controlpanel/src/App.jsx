import { configureStore } from "@reduxjs/toolkit";
import Keycloak from "keycloak-js";
import React, { useLayoutEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { createRoot } from "react-dom/client";
import { Bars } from "react-loader-spinner";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import * as h from "~/Helpers";
import { setInit } from "~/redux";
import redux from "./redux";

import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.css";
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.css";
import "~/assets/css/01-fontawesome.css";
import "~/assets/css/02-tabler-icons.css";
import "~/assets/css/03-core.css";
import "~/assets/css/04-theme-bordered.css";
import "~/assets/css/05-node-waves.css";
import "~/assets/css/06-perfect-scrollbar.css";
import "~/assets/css/07-custom.css";
import "~/assets/css/08-toastr.css";
import "~/assets/css/09-flatpickr.css";
import "~/assets/css/10-Typeahead.css";
import "~/assets/css/11-Typeahead.bs5.css";

const Menu = React.lazy(() => import("./Menu"));
const Routing = React.lazy(() => import("./Routing"));
const TopNavbar = React.lazy(() => import("./TopNavbar"));

const App = () => {
   const { init } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   // string
   const [pageTypeButton, setPageTypeButton] = useState("");

   useLayoutEffect(() => {
      const keycloak = new Keycloak({
         url: "https://keycloak.ar-raniry.ac.id/auth/",
         realm: sso.realm,
         clientId: sso.clientId,
      });

      keycloak
         .init({
            onLoad: "check-sso",
            checkLoginIframe: false,
         })
         .then(() => {
            if (keycloak.authenticated && !keycloak.isTokenExpired()) {
               keycloak.loadUserInfo().then((userInfo) => {
                  dispatch(setInit(userInfo));
               });
            } else {
               keycloak.login();
            }
         });
      return () => {};
   }, []);

   const loader = (
      <Bars
         visible={true}
         color="#4fa94d"
         radius="9"
         wrapperStyle={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            left: "50%",
         }}
         wrapperclassName="page-loader flex-column justify-content-center"
      />
   );

   const props = { pageTypeButton, setPageTypeButton };

   return h.objLength(init) ? (
      <React.Suspense fallback={loader}>
         <div className="layout-container">
            <Menu {...props} />
            <div className="layout-page">
               <TopNavbar {...props} />
               <div className="content-wrapper">
                  <Container fluid="xxl" className="flex-grow-1 container-p-y">
                     <Routing {...props} />
                  </Container>
               </div>
            </div>
         </div>
      </React.Suspense>
   ) : (
      loader
   );
};

const store = configureStore({
   reducer: { redux },
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
   <Provider store={store}>
      <Router basename="controlpanel">
         <App />
      </Router>
   </Provider>
);
