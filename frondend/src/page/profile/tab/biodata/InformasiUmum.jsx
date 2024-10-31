import moment from "moment";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";
moment.locale("id");

const InformasiUmum = () => {
   const { module } = useSelector((e) => e.redux);
   const { biodata } = module;

   const jekel = {
      L: "Laki - Laki",
      P: "Perempuan",
   };

   return (
      <Row>
         <Col md={6} sm={12}>
            <h6 className="text-success">Umum</h6>
            {h.detail_label("Jenis Kelamin", h.parse(h.parse("jenis_kelamin", biodata), jekel))}
            {h.detail_label("Tempat Lahir", h.parse("tempat_lahir", biodata))}
            {h.detail_label("Tanggal Lahir", moment(h.parse("tanggal_lahir", biodata)).format("DD MMMM YYYY"))}
            {h.detail_label("Agama", h.parse("agama", biodata))}
            {h.detail_label("Suku", h.parse("suku", biodata))}
            {h.detail_label("Berat Badan (Kg)", h.parse("berat_badan", biodata))}
            {h.detail_label("Tinggi Badan (cm)", h.parse("tinggi_badan", biodata))}
            {h.detail_label("Golongan Darah", h.parse("golongan_darah"))}
            {h.detail_label("Transportasi", h.parse("transportasi", biodata))}
         </Col>
         <Col md={6} sm={12}>
            <h6 className="text-success">Administrasi</h6>
            {h.detail_label("Kewarganegaraan", h.parse("nama_negara", biodata))}
            {h.detail_label("NIK / No. KTP", h.parse("nik", biodata))}
            {h.detail_label("Paspor", "")}
            {h.detail_label("No. KK", h.parse("nomor_kk", biodata))}
            {h.detail_label("No. KPS", h.parse("nomor_kps", biodata))}
            {h.detail_label("Status Nikah", h.parse("status_nikah", biodata))}
            {h.detail_label("Ukuran Jas Almamater", "")}
            {h.detail_label("File Akta Kelahiran", "")}
         </Col>
         <Col md={6} sm={12}>
            <h6 className="text-success">Kontak</h6>
            {h.detail_label("No. Telepon", h.parse("telepon", biodata))}
            {h.detail_label("No. HP", h.parse("hp", biodata))}
            {h.detail_label("Kepemilikan", "")}
            {h.detail_label("Email Kampus", h.parse("email_kampus", biodata))}
            {h.detail_label("Email Pribadi", h.parse("email", biodata))}
         </Col>
         <Col md={6} sm={12}>
            <h6 className="text-success">Pekerjaan</h6>
            {h.detail_label("Pekerjaan", h.parse("pekerjaan", biodata))}
            {h.detail_label("Instansi Pekerjaan", "")}
            {h.detail_label("Penghasilan", "")}
         </Col>
         <Col md={6} sm={12}>
            <h6 className="text-success">Bank</h6>
            {h.detail_label("No. Rekening", "")}
            {h.detail_label("Nama Rekening", "")}
            {h.detail_label("Nama Bank", "")}
         </Col>
      </Row>
   );
};
export default InformasiUmum;
