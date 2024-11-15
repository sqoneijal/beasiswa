import React from "react";
import { Bars } from "react-loader-spinner";
import { Route, Routes } from "react-router-dom";

const Dashboard = React.lazy(() => import("./page/dashboard/Context"));
const ReferensiKategoriBeasiswa = React.lazy(() => import("./page/referensi/kategoribeasiswa/Context"));
const ReferensiLampiranUpload = React.lazy(() => import("./page/referensi/lampiranupload/Context"));
const Periode = React.lazy(() => import("./page/periode/Context"));
const GenerateBeasiswa = React.lazy(() => import("./page/generatebeasiswa/Context"));
const Informasi = React.lazy(() => import("./page/informasi/Context"));

const Routing = ({ setPageTypeButton }) => {
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

   return (
      <Routes>
         <Route path="/" loader={loader} element={<Dashboard />} />
         <Route path="referensi">
            <Route path="kategoribeasiswa" loader={loader} element={<ReferensiKategoriBeasiswa {...props} />} />
            <Route path="lampiranupload" loader={loader} element={<ReferensiLampiranUpload {...props} />} />
         </Route>
         <Route path="periode" loader={loader} element={<Periode {...props} />} />
         <Route path="generatebeasiswa" loader={loader} element={<GenerateBeasiswa {...props} />} />
         <Route path="informasi" loader={loader} element={<Informasi {...props} />} />
      </Routes>
   );
};
export default Routing;
