import React from "react";
import { Col, Row } from "react-bootstrap";
import * as h from "~/Helpers";

const OrangTua = () => {
   return (
      <Row>
         <Col>
            <h4>Biodata Ayah</h4>
            {h.detail_label("Nama Lengkap", "-")}
            {h.detail_label("NIK", "-")}
            {h.detail_label("Tanggal Lahir", "-")}
            {h.detail_label("Status Hidup", "-")}
            {h.detail_label("Status Kekerabatan", "-")}
            {h.detail_label("Pendidikan Terakhir", "-")}
            {h.detail_label("Pekerjaan", "-")}
            {h.detail_label("Penghasilan", "-")}
            {h.detail_label("Alamat", "-")}
            {h.detail_label("No. Telepon", "-")}
            {h.detail_label("Alamat Email", "-")}
            {h.detail_label("Dapat Login", "-")}
         </Col>
         <Col>
            <h4>Biodata Ibu</h4>
            {h.detail_label("Nama Lengkap", "-")}
            {h.detail_label("NIK", "-")}
            {h.detail_label("Tanggal Lahir", "-")}
            {h.detail_label("Status Hidup", "-")}
            {h.detail_label("Status Kekerabatan", "-")}
            {h.detail_label("Pendidikan Terakhir", "-")}
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
export default OrangTua;
