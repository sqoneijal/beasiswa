import moment from "moment";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";
moment.locale("id");

const InformasiUmum = () => {
   const { module } = useSelector((e) => e.redux);
   const { biodata } = module;

   const jenisKelamin = (value) => {
      return value === "L" ? "Laki - Laki" : "Perempuan";
   };

   return (
      <Row>
         <Col>
            <h4>Umum</h4>
            {h.detail_label("Jenis Kelamin", jenisKelamin(h.parse("jenis_kelamin", biodata)))}
            {h.detail_label("Tempat Lahir", h.parse("tempat_lahir", biodata))}
            {h.detail_label("Tanggal Lahir", moment(h.parse("tanggal_lahir", biodata)).format("DD MMMM YYYY"))}
            {h.detail_label("Agama", h.parse("agama", biodata))}
            {h.detail_label("Suku", "-")}
            {h.detail_label("Berat Badan (Kg)", "-")}
            {h.detail_label("Tinggi Badan (cm)", "-")}
            {h.detail_label("Golongan Darah", "-")}
            {h.detail_label("Transportasi", "-")}
         </Col>
         <Col>
            <h4>Kontak</h4>
            {h.detail_label("No. Telepon", h.parse("telepon", biodata))}
            {h.detail_label("No. HP", h.parse("hp", biodata))}
            {h.detail_label("Kepemilikan", "-")}
            {h.detail_label("Email Kampus", h.parse("email_kampus", biodata))}
            {h.detail_label("Email Pribadi", h.parse("email", biodata))}
         </Col>
         <Col>
            <h4>Administrasi</h4>
            {h.detail_label("Kewarganegaraan", h.parse("nama_negara", biodata))}
            {h.detail_label("NIK / No. KTP", h.parse("nik", biodata))}
            {h.detail_label("Paspor", "-")}
            {h.detail_label("No. KK", h.parse("nomor_kk", biodata))}
            {h.detail_label("No. KPS", h.parse("nomor_kps"))}
            {h.detail_label("Status Nikah", h.parse("status_nikah", biodata))}
            {h.detail_label("Ukuran Jas Almamater", "-")}
            {h.detail_label("File Akta Kelahiran", "-")}
         </Col>
         <Col>
            <h4>Pekerjaan</h4>
            {h.detail_label("Pekerjaan", h.parse("pekerjaan", biodata))}
            {h.detail_label("Instansi Pekerjaan", "-")}
            {h.detail_label("Penghasilan", "-")}
         </Col>
         <Col>
            <h4>Bank</h4>
            {h.detail_label("No. Rekening", "-")}
            {h.detail_label("Nama Rekening", "-")}
            {h.detail_label("Nama Bank", "-")}
         </Col>
      </Row>
   );
};
export default InformasiUmum;
