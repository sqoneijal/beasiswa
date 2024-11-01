import React from "react";
import { Col, Row } from "react-bootstrap";
import * as h from "~/Helpers";

const Sekolah = () => {
   return (
      <Row>
         <Col>
            {h.detail_label("Pendidikan Asal", "")}
            {h.detail_label("Provinsi Sekolah", "")}
            {h.detail_label("Kota Sekolah", "")}
            {h.detail_label("Sekolah", "")}
            {h.detail_label("Alamat Sekolah", "")}
         </Col>
         <Col>
            {h.detail_label("Telepon Sekolah", "")}
            {h.detail_label("Nomor Ijazah Sekolah", "")}
            {h.detail_label("NISN", "")}
            {h.detail_label("File Ijazah Terakhir", "")}
         </Col>
      </Row>
   );
};
export default Sekolah;
