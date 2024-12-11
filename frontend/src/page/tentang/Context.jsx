import lozad from "lozad";
import React, { useLayoutEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Detail = React.lazy(() => import("./Detail"));

const Context = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const getData = () => {
      const fetch = h.get(`/tentang/getdata`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setModule({ ...module, detailContent: data.content }));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      getData();
      lozad().observe();
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
         wrapperClass="page-loader flex-column justify-content-center"
      />
   );

   return isLoading ? (
      loader
   ) : (
      <React.Suspense fallback={loader}>
         <section className="breadcrumb-area bg-default" style={{ backgroundImage: "url(/assets/breadcrumb-bg.jpg)" }}>
            <img src="/assets/shape-1.png" alt="" className="breadcrumb-shape" />
            <Container>
               <Row>
                  <Col xs={12}>
                     <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">Tentang</h2>
                     </div>
                  </Col>
               </Row>
            </Container>
         </section>
         <Detail />
      </React.Suspense>
   );
};
export default Context;
