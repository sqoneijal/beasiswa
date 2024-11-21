import React, { useLayoutEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const Content = () => {
   const { module, init } = useSelector((e) => e.redux);
   const { detailBeasiswa } = module;

   // bool
   const [isLoading, setIsLoading] = useState(false);

   // object
   const [detailMahasiswa, setDetailMahasiswa] = useState({});

   // string
   const [angkatanMahasiswa, setAngkatanMahasiswa] = useState("");

   const checkIjinDaftarBeasiswa = (user) => {
      return h.objLength(user) && user.roleMahasiswa;
   };

   const getBiodataMahasiswa = (nim) => {
      const formData = { nim };

      setIsLoading(true);
      const fetch = h.post(`/mahasiswa/biodata/getdata`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setAngkatanMahasiswa(data.id_periode.substring(0, data.id_periode.length - 1));
         setDetailMahasiswa(data);
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

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

   useLayoutEffect(() => {
      if (h.objLength(init) && init.roleMahasiswa) getBiodataMahasiswa(init.preferred_username);
      return () => {};
   }, [init]);

   return isLoading ? (
      loader
   ) : (
      <Col xl={8} lg={8}>
         <div className="blog_details-wrap mb-55">
            <div className="course_details-top mb-60">
               <h3 className="course_details-title">Beasiswa : {h.parse("nama", detailBeasiswa)}</h3>
               {checkIjinDaftarBeasiswa(init) &&
                  detailBeasiswa.angkatan.includes(angkatanMahasiswa) &&
                  h.parse("status_mahasiswa", detailMahasiswa) === "Aktif" && (
                     <div className="course_details-meta">
                        <div className="course_details-meta-right">
                           <a href="#" className="theme-btn theme-btn-medium">
                              Daftar
                           </a>
                        </div>
                     </div>
                  )}
            </div>
            <div className="blog_details-content">
               <div className="blog_details-inner-text mr-80">{h.parse("keterangan", detailBeasiswa)}</div>
            </div>
         </div>
      </Col>
   );
};
export default Content;
