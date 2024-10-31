import React from "react";
import { Col, Row } from "react-bootstrap";
import * as h from "~/Helpers";

const OrangTua = () => {
   return (
      <Row>
         <Col>
            <h6 className="text-success">Biodata Ayah</h6>
            {h.detail_label("Nama Lengkap", "")}
            {h.detail_label("NIK", "")}
            {h.detail_label("Tanggal Lahir", "")}
            {h.detail_label("Status Hidup", "")}
            {h.detail_label("Status Kekerabatan", "")}
            {h.detail_label("Pendidikan Terakhir", "")}
            {h.detail_label("Pekerjaan", "")}
            {h.detail_label("Penghasilan", "")}
            {h.detail_label("Alamat", "")}
            {h.detail_label("No. Telepon", "")}
            {h.detail_label("Alamat Email", "")}
         </Col>
         <Col>
            <h6 className="text-success">Biodata Ibu</h6>
            {h.detail_label("Nama Lengkap", "")}
            {h.detail_label("NIK", "")}
            {h.detail_label("Tanggal Lahir", "")}
            {h.detail_label("Status Hidup", "")}
            {h.detail_label("Status Kekerabatan", "")}
            {h.detail_label("Pendidikan Terakhir", "")}
            {h.detail_label("Pekerjaan", "")}
            {h.detail_label("Penghasilan", "")}
            {h.detail_label("Alamat", "")}
            {h.detail_label("No. Telepon", "")}
            {h.detail_label("Alamat Email", "")}
         </Col>
      </Row>
   );
};
export default OrangTua;
