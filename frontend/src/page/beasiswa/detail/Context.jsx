import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setModule } from "~/redux";

const Breadcrumb = React.lazy(() => import("./Breadcrumb"));
const Content = React.lazy(() => import("./Content"));
const Sidebar = React.lazy(() => import("./Sidebar"));

const Context = () => {
   const { module } = useSelector((e) => e.redux);
   const { slug } = useParams();
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const getDaftarPeriode = () => {
      return axios.post(`${window.apiPath}/periode/getdata`);
   };

   const getData = (slug) => {
      return axios.post(
         `${window.apiPath}/referensi/kategoribeasiswa/read`,
         { slug },
         {
            headers: {
               "Content-Type": "application/x-www-form-urlencoded",
            },
         }
      );
   };

   useLayoutEffect(() => {
      if (slug) {
         Promise.all([getDaftarPeriode(), getData(slug)])
            .then(([daftarPeriode, detailBeasiswa]) => {
               dispatch(setModule({ ...module, detailBeasiswa: detailBeasiswa.data, daftarPeriode: daftarPeriode.data }));
            })
            .finally(() => {
               setIsLoading(false);
            });
      }
      return () => {};
   }, [slug]);

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
         <Breadcrumb />
         <section className="blog_details-area pt-120 pb-80">
            <Container>
               <Row>
                  <Content />
                  <Sidebar />
               </Row>
            </Container>
         </section>
      </React.Suspense>
   );
};
export default Context;
