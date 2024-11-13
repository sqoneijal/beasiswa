import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { setModule } from "~/redux";

const Lists = React.lazy(() => import("./Lists"));
const Forms = React.lazy(() => import("./Forms"));
const ModalDetail = React.lazy(() => import("./ModalDetail"));

const Context = ({ setPageTypeButton }) => {
   const { module } = useSelector((e) => e.redux);
   const { pageType } = module;
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const getDataKategoriBeasiswa = () => {
      return axios.post(
         `${window.apiPath}/referensi/kategoribeasiswa/getdata`,
         {
            start: 0,
            length: 100,
         },
         {
            headers: {
               "Content-Type": "application/x-www-form-urlencoded",
            },
         }
      );
   };

   const getDataLampiranUpload = () => {
      return axios.post(
         `${window.apiPath}/referensi/lampiranupload/getdata`,
         {
            start: 0,
            length: 100,
         },
         {
            headers: {
               "Content-Type": "application/x-www-form-urlencoded",
            },
         }
      );
   };

   const getDataPeriode = () => {
      return axios.post(
         `${window.apiPath}/periode/getdata`,
         {},
         {
            headers: {
               "Content-Type": "application/x-www-form-urlencoded",
            },
         }
      );
   };

   const initPage = () => {
      Promise.all([getDataKategoriBeasiswa(), getDataLampiranUpload(), getDataPeriode()])
         .then(([kategoriBeasiswa, lampiranUpload, periode]) => {
            dispatch(
               setModule({ ...module, kategoriBeasiswa: kategoriBeasiswa.data.data, lampiranUpload: lampiranUpload.data.data, periode: periode.data })
            );
         })
         .finally(() => setIsLoading(false));
   };

   useLayoutEffect(() => {
      initPage();
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

   const props = { setPageTypeButton };

   return isLoading ? (
      loader
   ) : (
      <React.Suspense fallback={loader}>
         <ModalDetail />
         <Row>
            <Col>
               <Card>
                  {pageType === "add" || pageType === "update" ? (
                     <Card.Body>
                        <Forms {...props} />
                     </Card.Body>
                  ) : (
                     <Lists {...props} />
                  )}
               </Card>
            </Col>
         </Row>
      </React.Suspense>
   );
};
export default Context;
