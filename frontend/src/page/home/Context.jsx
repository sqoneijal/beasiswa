import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { setModule } from "~/redux";

const OpeningPage = React.lazy(() => import("./OpeningPage"));
const Counter = React.lazy(() => import("./Counter"));
const ExploreBeasiswa = React.lazy(() => import("./ExploreBeasiswa"));
const InformasiBeasiswa = React.lazy(() => import("./InformasiBeasiswa"));
const StickyInformasi = React.lazy(() => import("./StickyInformasi"));

const Context = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const initPage = () => {
      const endpoints = [`${window.apiPath}/master/beasiswa/getdata`, `${window.apiPath}/informasi/getinformasiterbaru`];

      axios
         .all(endpoints.map((endpoint) => axios.get(endpoint)))
         .then(
            axios.spread((...res) => {
               const masterBeasiswa = res[0];
               const informasiTerbaru = res[1];

               dispatch(setModule({ ...module, daftarMasterBeasiswa: masterBeasiswa.data, informasiTerbaru: informasiTerbaru.data }));
            })
         )
         .finally(() => {
            setIsLoading(false);
         });
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

   return isLoading ? (
      loader
   ) : (
      <React.Suspense fallback={loader}>
         <OpeningPage />
         <Counter />
         <ExploreBeasiswa />
         <InformasiBeasiswa />
         <StickyInformasi />
      </React.Suspense>
   );
};
export default Context;
