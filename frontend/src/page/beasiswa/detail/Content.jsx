import React, { useLayoutEffect, useState } from "react";
import { Col, Table } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const Content = () => {
   const { module, init } = useSelector((e) => e.redux);
   const { detailBeasiswa } = module;

   // bool
   const [isLoading, setIsLoading] = useState(false);

   // object
   const [detailMahasiswa, setDetailMahasiswa] = useState({});
   const [statusPendaftaranBeasiswa, setStatusPendaftaranBeasiswa] = useState({});

   // string
   const [angkatanMahasiswa, setAngkatanMahasiswa] = useState("");

   const checkIjinDaftarBeasiswa = (user) => {
      return h.objLength(user) && user.roleMahasiswa;
   };

   const getBiodataMahasiswa = (nim, id_generate_beasiswa) => {
      const formData = { nim, id_generate_beasiswa };

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
         setStatusPendaftaranBeasiswa(data.statusPendaftaranBeasiswa);
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
      if (h.objLength(init) && init.roleMahasiswa) getBiodataMahasiswa(init.preferred_username, h.parse("id_generate_beasiswa", detailBeasiswa));
      return () => {};
   }, [init, detailBeasiswa]);

   const renderBukti = (id_lampiran, file) => {
      return typeof file[id_lampiran] === "undefined" ? "" : file[id_lampiran];
   };

   const renderDaftarButton = (detailBeasiswa, detailMahasiswa) => {
      if (detailBeasiswa.wajib_ipk === "t" && detailMahasiswa.ipk >= detailBeasiswa.minimal_ipk) {
         return (
            <div className="course_details-meta">
               <div className="course_details-meta-right">
                  <Link to={`/beasiswa/daftar/${h.parse("id_generate_beasiswa", detailBeasiswa)}`} className="theme-btn theme-btn-medium">
                     Daftar
                  </Link>
               </div>
            </div>
         );
      }

      return (
         <div className="course_details-meta">
            <div className="course_details-meta-right">
               <Link to={`/beasiswa/daftar/${h.parse("id_generate_beasiswa", detailBeasiswa)}`} className="theme-btn theme-btn-medium">
                  Daftar
               </Link>
            </div>
         </div>
      );
   };

   return isLoading ? (
      loader
   ) : (
      <Col xl={8} lg={8}>
         <div className="blog_details-wrap mb-55">
            <div className="course_details-top mb-60">
               <h3 className="course_details-title">Beasiswa : {h.parse("nama", detailBeasiswa)}</h3>
               {checkIjinDaftarBeasiswa(init) &&
                  detailBeasiswa.angkatan.includes(angkatanMahasiswa) &&
                  detailMahasiswa.statusPembayaranSPP &&
                  !h.objLength(statusPendaftaranBeasiswa) &&
                  renderDaftarButton(detailBeasiswa, detailMahasiswa)}
            </div>
            <div className="blog_details-content">
               <div className="blog_details-inner-text mr-80">{h.parse("keterangan", detailBeasiswa)}</div>
               {h.objLength(statusPendaftaranBeasiswa) && (
                  <div className="blog_details-inner-text mr-80 mt-60">
                     <h3 className="course_details-title">Status Pendaftaran Beasiswa</h3>
                     {h.parse("sudah_divalidasi", statusPendaftaranBeasiswa) === "f" && <p>Status pendaftaran anda sedang divalidasi oleh admin.</p>}
                     <Table responsive hover size="sm">
                        <thead>
                           <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                              <th>keterangan lampiran</th>
                              <th>bukti</th>
                           </tr>
                        </thead>
                        <tbody>
                           <Each
                              of={detailMahasiswa.lampiranPerluDiupload}
                              render={(row) => (
                                 <tr>
                                    <td>{h.parse("nama", row)}</td>
                                    <td>
                                       <a
                                          href={`https://lh3.googleusercontent.com/d/${
                                             renderBukti(row.id, detailMahasiswa.lampiranYangDiupload).google_drive_id
                                          }?authuser=1/view`}
                                          target="_blank">
                                          {renderBukti(row.id, detailMahasiswa.lampiranYangDiupload).orig_name}
                                       </a>
                                    </td>
                                 </tr>
                              )}
                           />
                        </tbody>
                     </Table>
                  </div>
               )}
            </div>
         </div>
      </Col>
   );
};
export default Content;
