import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { Col } from "react-bootstrap";
import * as h from "~/Helpers";

const OtherTags = ({ input, setInput, selectedLampiranUpload, setSelectedLampiranUpload }) => {
   // array
   const [daftarKategori, setDaftarKategori] = useState([]);
   const [daftarLampiran, setDaftarLampiran] = useState([]);

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

   useLayoutEffect(() => {
      Promise.all([getDataKategoriBeasiswa(), getDataLampiranUpload()]).then(([kategoriBeasiswa, lampiranUpload]) => {
         setDaftarKategori(kategoriBeasiswa.data.data);
         setDaftarLampiran(lampiranUpload.data.data);
      });
      return () => {};
   }, []);

   return (
      <Col lg={4} md={4} sm={12}>
         {h.form_select(
            "Kategori (Optional)",
            "id_jenis_beasiswa",
            12,
            daftarKategori.map((row) => ({ value: h.parse("id", row), label: h.parse("nama", row) })),
            {
               value: h.parse("id_jenis_beasiswa", input),
               onChange: (e) => setInput((prev) => ({ ...prev, id_jenis_beasiswa: e.target.value })),
            }
         )}
         {h.form_multiple("Lampiran Upload (Optional)", "lampiran_upload", 12, {
            labelKey: (e) => e.label.toString(),
            options: daftarLampiran.map((row) => ({ id: h.parse("id", row), label: h.parse("nama", row) })),
            selected: selectedLampiranUpload,
            onChange: setSelectedLampiranUpload,
         })}
      </Col>
   );
};
export default OtherTags;
