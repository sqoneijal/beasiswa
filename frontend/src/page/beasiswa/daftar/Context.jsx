import React, { useLayoutEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Header = React.lazy(() => import("./Header"));
const Forms = React.lazy(() => import("./Forms"));
const Sidebar = React.lazy(() => import("./Sidebar"));

const Context = () => {
   const { init, module } = useSelector((e) => e.redux);
   const { id_generate_beasiswa } = useParams();
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const initPage = (id_generate_beasiswa, nim) => {
      const formData = { id_generate_beasiswa, nim };

      const fetch = h.post(`/generatebeasiswa/initpendaftaranmahasiswa`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setModule({ ...module, ...data }));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      if (id_generate_beasiswa && h.objLength(init)) initPage(id_generate_beasiswa, init.preferred_username);
      else
         window.open(
            `https://iam.ar-raniry.ac.id/realms/uinar/protocol/openid-connect/auth?client_id=${sso.clientId}&redirect_uri=${encodeURIComponent(
               location.href
            )}&response_mode=fragment&response_type=code&scope=openid`,
            "_parent"
         );
      return () => {};
   }, [id_generate_beasiswa, init]);

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

   const props = { initPage };

   return isLoading ? (
      loader
   ) : (
      <React.Suspense fallback={loader}>
         <Header />
         <section className="blog_details-area pt-120 pb-80">
            <Container>
               <Row>
                  <Forms {...props} />
                  <Sidebar />
               </Row>
            </Container>
         </section>
      </React.Suspense>
   );
};
export default Context;
