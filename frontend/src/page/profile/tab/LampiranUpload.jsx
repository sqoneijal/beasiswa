import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const LampiranUpload = () => {
   const { init } = useSelector((e) => e.redux);

   // bool
   const [isLoading, setIsLoading] = useState(true);
   const [isLoadingUpload, setIsLoadingUpload] = useState(false);

   // array
   const [daftarLampiran, setDaftarLampiran] = useState([]);

   // object
   const [lampiranDiUpload, setLampiranDiUpload] = useState({});

   const getDaftarLampiran = () => {
      return axios.post(
         `${window.apiPath}/referensi/lampiranupload/getdata`,
         { start: 0, length: 1000 },
         {
            headers: {
               "Content-Type": "application/x-www-form-urlencoded",
            },
         }
      );
   };

   const getLampiranUploadMahasiswa = (nim) => {
      return axios.post(
         `${window.apiPath}/mahasiswa/lampiranupload/getdata`,
         { nim },
         {
            headers: {
               "Content-Type": "application/x-www-form-urlencoded",
            },
         }
      );
   };

   useLayoutEffect(() => {
      Promise.all([getDaftarLampiran(), getLampiranUploadMahasiswa(init.preferred_username)])
         .then(([daftarLampiran, lampiranDiUpload]) => {
            setDaftarLampiran(daftarLampiran.data.data);
            setLampiranDiUpload(lampiranDiUpload.data);
         })
         .finally(() => setIsLoading(false));
      return () => {};
   }, [init]);

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

         setLampiranDiUpload(data.data);
      });
      fetch.finally(() => {
         setIsLoadingUpload(false);
      });
   };

   return isLoading ? (
      loader
   ) : (
      <Card>
         <Card.Body>
            <Table responsive hover size="sm">
               <thead>
                  <tr>
                     <th>Nama Lampiran</th>
                     <th>Bukti</th>
                     <th>Aksi</th>
                  </tr>
               </thead>
               <tbody>
                  <Each
                     of={daftarLampiran}
                     render={(row) => (
                        <tr>
                           <td>{h.parse("nama", row)}</td>
                           <td>
                              {typeof lampiranDiUpload[row.id] === "undefined" ? (
                                 <span className="text-danger">Belum diupload</span>
                              ) : (
                                 <a
                                    href={`https://lh3.googleusercontent.com/d/${h.parse(
                                       "google_drive_id",
                                       lampiranDiUpload[row.id]
                                    )}?authuser=1/view`}
                                    target="_blank">
                                    {h.parse("orig_name", lampiranDiUpload[row.id])}
                                 </a>
                              )}
                           </td>
                           <td>
                              {isLoadingUpload ? (
                                 "Loading..."
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
         </Card.Body>
      </Card>
   );
};
export default LampiranUpload;
