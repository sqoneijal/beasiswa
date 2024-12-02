import { configureStore } from "@reduxjs/toolkit";
import Keycloak from "keycloak-js";
import React, { useLayoutEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Bars } from "react-loader-spinner";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import * as h from "~/Helpers";
import { setInit } from "~/redux";
import redux from "./redux";

import "./assets/css/01-bootstrap.css";
import "./assets/css/02-animate.css";
import "./assets/css/03-magnific-popup.css";
import "./assets/css/04-fontawesome-all.css";
import "./assets/css/05-nice-select.css";
import "./assets/css/06-meanmenu.css";
import "./assets/css/07-swiper-bundle.css";
import "./assets/css/08-main.css";
import "./assets/css/09-toastr.css";
import "./assets/css/10-custom.css";

const Header = React.lazy(() => import("./Header"));
const Routing = React.lazy(() => import("./Routing"));
const Footer = React.lazy(() => import("./Footer"));

const App = () => {
   const dispatch = useDispatch();
   const location = useLocation();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const getAdminUserInfo = (username, userInfo) => {
      const formData = { username };

      setIsLoading(true);
      const fetch = h.post(`/user/getdata`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         if (h.objLength(data)) {
            userInfo["roleAdmin"] = true;
            userInfo["roleMahasiswa"] = false;
            userInfo.role = data.role;

            dispatch(setInit(userInfo));
            return;
         }

         const logoutUrl = `https://keycloak.ar-raniry.ac.id/auth/realms/uinar/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent(
            location.href
         )}`;
         window.open(logoutUrl, "_self");
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

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
         .then((authenticated) => {
            if (authenticated) {
               keycloak.loadUserInfo().then((userInfo) => {
                  const roleAdmin = keycloak.hasRealmRole("FUNG") || keycloak.hasRealmRole("ADM");
                  const roleMahasiswa = keycloak.hasRealmRole("MHS");

                  if (roleAdmin) {
                     getAdminUserInfo(userInfo.preferred_username, userInfo);
                  } else {
                     userInfo["roleAdmin"] = roleAdmin;
                     userInfo["roleMahasiswa"] = roleMahasiswa;

                     dispatch(setInit(userInfo));
                  }
                  setIsLoading(false);
               });
            }
         })
         .finally(() => setIsLoading(false));
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
         }}
         wrapperClass="page-loader flex-column bg-dark bg-opacity-25"
      />
   );

   return isLoading ? (
      loader
   ) : (
      <React.Suspense fallback={loader}>
         <Header />
         <main>
            <Routing />
         </main>
         <Footer />
      </React.Suspense>
   );
};

const store = configureStore({
   reducer: { redux },
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
   <Provider store={store}>
      <Router>
         <App />
      </Router>
   </Provider>
);
