import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const LampiranUpload = () => {
   // bool
   const [isLoading, setIsLoading] = useState(true);

   // array
   const [daftarLampiran, setDaftarLampiran] = useState([]);

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

   const getLampiranUploadMahasiswa = () => {
      return axios.post(
         `${window.apiPath}/referensi/lampiranupload/getdatalampiranmahasiswa`,
         { start: 0, length: 1000 },
         {
            headers: {
               "Content-Type": "application/x-www-form-urlencoded",
            },
         }
      );
   };

   useLayoutEffect(() => {
      Promise.all([getDaftarLampiran(), getLampiranUploadMahasiswa()])
         .then(([daftarLampiran]) => {
            setDaftarLampiran(daftarLampiran.data.data);
         })
         .finally(() => setIsLoading(false));
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
      <Card>
         <Card.Body>
            <Table responsive hover size="sm">
               <thead>
                  <tr>
                     <th>Nama Lampiran</th>
                     <th>Bukti</th>
                  </tr>
               </thead>
               <tbody>
                  <Each
                     of={daftarLampiran}
                     render={(row) => (
                        <tr>
                           <td>{h.parse("nama", row)}</td>
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
