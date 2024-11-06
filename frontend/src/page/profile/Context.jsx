import React, { useLayoutEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const Header = React.lazy(() => import("./Header"));
const LeftNav = React.lazy(() => import("./LeftNav"));
const TabContext = React.lazy(() => import("./tab/Context"));

const Context = () => {
   const { init } = useSelector((e) => e.redux);

   useLayoutEffect(() => {
      if (!h.objLength(init)) {
         window.open(
            `https://keycloak.ar-raniry.ac.id/auth/realms/uinar/protocol/openid-connect/auth?client_id=${
               sso.clientId
            }&redirect_uri=${encodeURIComponent(location.href)}&response_mode=fragment&response_type=code&scope=openid`,
            "_parent"
         );
      }
      return () => {};
   }, [init]);

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
         wrapperClass="page-loader flex-column justify-content-center"
      />
   );

   return (
      <React.Suspense fallback={loader}>
         <Header />
         <section className="course_details-area pt-120 pb-60">
            <Container>
               <Row>
                  <LeftNav />
                  <TabContext />
               </Row>
            </Container>
         </section>
      </React.Suspense>
   );
};
export default Context;
