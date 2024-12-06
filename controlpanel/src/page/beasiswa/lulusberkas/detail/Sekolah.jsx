import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const Sekolah = () => {
   const { module } = useSelector((e) => e.redux);
   const { biodata } = module;

   return (
      <Row>
         <Col>
            {h.detail_label("Pendidikan Asal", "-")}
            {h.detail_label("Provinsi Sekolah", "-")}
            {h.detail_label("Kota Sekolah", "-")}
            {h.detail_label("Sekolah", h.parse("nama_sekolah", biodata))}
            {h.detail_label("Alamat Sekolah", "-")}
         </Col>
         <Col>
            {h.detail_label("Telepon Sekolah", "-")}
            {h.detail_label("Nomor Ijazah Sekolah", h.parse("no_ijazah_sma", biodata))}
            {h.detail_label("NISN", h.parse("nisn", biodata))}
            {h.detail_label("File Ijazah Terakhir", "-")}
         </Col>
      </Row>
   );
};
export default Sekolah;
