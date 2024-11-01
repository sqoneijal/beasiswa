import React, { useLayoutEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Biodata = () => {
   const { init, module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   // object
   const [biodata, setBiodata] = useState({});

   const getBiodata = (nim) => {
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

         setBiodata(data);
         dispatch(setModule({ ...module, biodata: data }));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      getBiodata(init.preferred_username);
      return () => {};
   }, [init]);

   const kebutuhan_khusus = (status) => {
      return status === 1 ? "Iya" : "Tidak";
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

   return isLoading ? (
      loader
   ) : (
      <Row>
         <Col>
            {h.detail_label("NIM", h.parse("nim", biodata))}
            {h.detail_label("Nama", h.parse("nama", biodata))}
            {h.detail_label("Program Studi", h.parse("program_studi", biodata))}
            {h.detail_label("Periode Masuk", h.periode(h.parse("id_periode", biodata)))}
            {h.detail_label("Tahun Kurikulum", h.parse("id_kurikulum", biodata))}
            {h.detail_label("Sistem Kuliah", h.parse("sistem_kuliah", biodata))}
         </Col>
         <Col>
            {h.detail_label("Jenis Pendaftaran", h.parse("sistem_kuliah", biodata))}
            {h.detail_label("Jalur Pendaftaran", h.parse("jalur_pendaftaran", biodata))}
            {h.detail_label("Gelombang", h.parse("gelombang", biodata))}
            {h.detail_label("Tanggal Masuk", h.parse("sistem_kuliah", biodata))}
            {h.detail_label("Kebutuhan Khusus", kebutuhan_khusus(h.parse("is_disabilitas", biodata)))}
            {h.detail_label("Status Mahasiswa", h.parse("status_mahasiswa", biodata))}
         </Col>
      </Row>
   );
};
export default Biodata;
