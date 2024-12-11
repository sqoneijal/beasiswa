import React from "react";
import { Bars } from "react-loader-spinner";
import { Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("./page/home/Context"));
const Profile = React.lazy(() => import("./page/profile/Context"));
const Informasi = React.lazy(() => import("./page/informasi/Context"));
const InformasiRead = React.lazy(() => import("./page/informasi/read/Detail"));
const Beasiswa = React.lazy(() => import("./page/beasiswa/Context"));
const BeasiswaDetail = React.lazy(() => import("./page/beasiswa/detail/Context"));
const BeasiswaDaftar = React.lazy(() => import("./page/beasiswa/daftar/Context"));
const Tentang = React.lazy(() => import("./page/tentang/Context"));

const Routing = () => {
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
      <Routes>
         <Route path="/" loader={loader} element={<Home />} />
         <Route path="profile" loader={loader} element={<Profile />} />
         <Route path="informasi" loader={loader} element={<Informasi />} />
         <Route path="informasi/read/:slug" loader={loader} element={<InformasiRead />} />
         <Route path="beasiswa" loader={loader} element={<Beasiswa />} />
         <Route path="beasiswa/read/:slug" loader={loader} element={<BeasiswaDetail />} />
         <Route path="beasiswa/daftar/:id_generate_beasiswa" loader={loader} element={<BeasiswaDaftar />} />
         <Route path="tentang" loader={loader} element={<Tentang />} />
      </Routes>
   );
};
export default Routing;
