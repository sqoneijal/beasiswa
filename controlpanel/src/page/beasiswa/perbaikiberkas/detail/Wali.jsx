import React from "react";
import { Col, Row } from "react-bootstrap";
import * as h from "~/Helpers";

const Wali = () => {
   return (
      <Row>
         <Col>
            {h.detail_label("Nama Lengkap", "-")}
            {h.detail_label("NIK", "-")}
            {h.detail_label("Tanggal Lahir", "-")}
            {h.detail_label("Status Hidup", "-")}
            {h.detail_label("Status Kekerabatan", "-")}
            {h.detail_label("Pendidikan Terakhir", "-")}
         </Col>
         <Col>
            {h.detail_label("Pekerjaan", "-")}
            {h.detail_label("Penghasilan", "-")}
            {h.detail_label("Alamat", "-")}
            {h.detail_label("No. Telepon", "-")}
            {h.detail_label("Alamat Email", "-")}
            {h.detail_label("Dapat Login", "-")}
         </Col>
      </Row>
   );
};
export default Wali;
