import React, { useLayoutEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import * as h from "~/Helpers";

const Lists = React.lazy(() => import("./Lists"));

const Context = ({ setPageTypeButton }) => {
   // bool
   const [state, setState] = useState({
      isDownload: false,
      refreshList: false,
      content: [],
   });

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

   const downloadDariSevima = () => {
      setState((prevState) => ({ ...prevState, isDownload: true }));
      const fetch = h.get(`/periode/downloaddarisevima`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setState((prevState) => ({ ...prevState, refreshList: true, content: data.content }));
      });
      fetch.finally(() => {
         setState((prevState) => ({ ...prevState, isDownload: false }));
      });
   };

   useLayoutEffect(() => {
      setPageTypeButton(
         h.buttons("Syncron Dari Sevima", state.isDownload, {
            onClick: downloadDariSevima,
         })
      );
      return () => {};
   }, [state]);

   const props = { state, setState };

   return (
      <React.Suspense fallback={loader}>
         <Row>
            <Col>
               <Card className="shadow-sm">
                  <Card.Body>
                     <Lists {...props} />
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </React.Suspense>
   );
};
export default Context;
