import React, { useState } from "react";
import { Button, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const Forms = ({ initPage }) => {
   const { module, init } = useSelector((e) => e.redux);
   const { apakahSudahMendaftarSebelumnya, generateBeasiswa, lampiranTelahDiUpload } = module;
   const { lampiranToUpload } = generateBeasiswa;
   const { id_generate_beasiswa } = useParams();
   const navigate = useNavigate();

   // bool
   const [isLoadingUpload, setIsLoadingUpload] = useState(false);
   const [isSubmit, setIsSubmit] = useState(false);

   const renderBukti = (id_lampiran, file) => {
      return typeof file[id_lampiran] === "undefined" ? "" : file[id_lampiran];
   };

   const handleUpload = (nim, file, id_lampiran_upload) => {
      const formData = { nim, file, id_lampiran_upload };

      setIsLoadingUpload(true);
      const fetch = h.post(`/mahasiswa/lampiranupload/upload`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         initPage(id_generate_beasiswa, nim);
      });
      fetch.finally(() => {
         setIsLoadingUpload(false);
      });
   };

   const submitDaftar = () => {
      const formData = {
         nim: init.preferred_username,
         id_generate_beasiswa,
         periode: h.parse("periode", generateBeasiswa),
         nama: init.name,
      };

      setIsSubmit(true);
      const fetch = h.post(`/generatebeasiswa/daftar`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         h.notification(data.status, h.parse("msg_response", data));
         initPage(id_generate_beasiswa, init.preferred_username);

         if (data.status) {
            navigate(`/beasiswa/read/${h.parse("jenis_kategori_beasiswa", generateBeasiswa).replace(" ", "-").toLowerCase()}`);
         }
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   return (
      <Col xl={8} lg={8}>
         <div className="blog_details-wrap mb-55">
            <div className="course_details-top mb-60">
               <h3 className="course_details-title">Pendaftaran {h.parse("jenis_kategori_beasiswa", generateBeasiswa)}</h3>
            </div>
            <div className="blog_details-content">
               <div className="blog_details-inner-text mr-80">
                  {apakahSudahMendaftarSebelumnya === false ? (
                     <React.Fragment>
                        <p>{h.parse("keterangan_kategori_beasiswa", generateBeasiswa)}</p>
                        {h.arrLength(lampiranToUpload) && (
                           <React.Fragment>
                              <h5>Berikut daftar lampiran/berkas yang harus anda lengkapi.</h5>
                              <Table responsive hover size="sm">
                                 <thead>
                                    <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                       <th>keterangan lampiran</th>
                                       <th>bukti</th>
                                       <th>aksi</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <Each
                                       of={lampiranToUpload}
                                       render={(row) => (
                                          <tr>
                                             <td>{h.parse("nama", row)}</td>
                                             <td>
                                                <a
                                                   href={`https://lh3.googleusercontent.com/d/${
                                                      renderBukti(row.id, lampiranTelahDiUpload).google_drive_id
                                                   }?authuser=1/view`}
                                                   target="_blank">
                                                   {renderBukti(row.id, lampiranTelahDiUpload).orig_name}
                                                </a>
                                             </td>
                                             <td>
                                                {isLoadingUpload ? (
                                                   <span className="fw-bold text-info">Loading...</span>
                                                ) : (
                                                   <label className="fw-bold text-info">
                                                      Upload{" "}
                                                      <input
                                                         type="file"
                                                         style={{ display: "none" }}
                                                         onChange={(e) => {
                                                            const [file] = e.target.files;
                                                            if (file) {
                                                               handleUpload(init.preferred_username, file, row.id);
                                                            }
                                                         }}
                                                      />
                                                   </label>
                                                )}
                                             </td>
                                          </tr>
                                       )}
                                    />
                                 </tbody>
                              </Table>
                              <Button className="theme-btn theme-btn-medium" disabled={isSubmit} onClick={() => (isSubmit ? null : submitDaftar())}>
                                 {isSubmit ? "Loading..." : "Daftar"}
                              </Button>
                           </React.Fragment>
                        )}
                     </React.Fragment>
                  ) : (
                     <p>
                        Mohon maaf, anda tidak dapat mendaftar pada beasiswa {h.parse("jenis_kategori_beasiswa", generateBeasiswa)}. Dikarenakan ada
                        beasiswa aktif yang masih anda terima.
                     </p>
                  )}
               </div>
            </div>
         </div>
      </Col>
   );
};
export default Forms;
