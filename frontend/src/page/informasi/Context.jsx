import React, { useLayoutEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import * as h from "~/Helpers";

const Lists = React.lazy(() => import("./Lists"));

const Context = () => {
   // bool
   const [isLoading, setIsLoading] = useState(true);

   // array
   const [daftarInformasi, setDaftarInformasi] = useState([]);

   // string
   const [totalData, setTotalData] = useState(0);
   const [currentPage, setCurrentPage] = useState(0);

   const getData = (start = 0, loadMore = false) => {
      const formData = { start, length: 9, "order[0][column]": 3, "order[0][dir]": "desc" };

      const fetch = h.post(`/informasi/getdata`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setTotalData(data.recordsTotal);

         if (loadMore) {
            setDaftarInformasi((prev) => [...prev, ...data.data]);
         } else {
            setDaftarInformasi(data.data);
         }

         setCurrentPage((prev) => prev + 1);
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      getData();
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

   const props = { daftarInformasi, totalData, currentPage, getData };

   return isLoading ? (
      loader
   ) : (
      <React.Suspense fallback={loader}>
         <section className="breadcrumb-area bg-default" style={{ backgroundImage: `url(/assets/breadcrumb-bg.jpg)` }}>
            <img src="/assets/shape-1.png" alt="" className="breadcrumb-shape" />
            <Container>
               <Row>
                  <Col xs={12}>
                     <div className="breadcrumb-content">
                        <h2 className="breadcrumb-title">Informasi</h2>
                     </div>
                  </Col>
               </Row>
            </Container>
         </section>
         <Lists {...props} />
      </React.Suspense>
   );
};
export default Context;
