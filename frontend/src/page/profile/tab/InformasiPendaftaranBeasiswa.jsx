import moment from "moment";
import React from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
moment.locale("id");

const InformasiPendaftaranBeasiswa = () => {
   const { module } = useSelector((e) => e.redux);
   const { pendaftar, lampiranUpload, lampiranYangDiupload } = module;

   const statusValidasi = {
      t: "Sudah Validasi",
      f: "Belum Validasi",
   };

   const renderBukti = (id, file) =>
      typeof file[id] === "undefined" ? (
         ""
      ) : (
         <a href={`https://lh3.googleusercontent.com/d/${h.parse("google_drive_id", file[id])}?authuser=1/view`} target="_blank">
            {file[id].orig_name}
         </a>
      );

   return (
      <Card.Body>
         <h5>Informasi Status Beasiswa</h5>
         <Row>
            <Col>
               {h.detail_label("Jenis Beasiswa", h.parse("nama_jenis_beasiswa", pendaftar))}
               {h.detail_label("Periode", h.periode(h.parse("periode", pendaftar)))}
               {h.detail_label("Tanggal Daftar", moment(h.parse("uploaded", pendaftar)).format("DD MMMM YYYY"))}
               {h.detail_label("Status Validasi", statusValidasi[h.parse("sudah_divalidasi", pendaftar)])}
            </Col>
            <Col>
               {h.detail_label(
                  "Tanggal Validasi",
                  h.parse("tanggal_validasi", pendaftar) && moment(h.parse("tanggal_validasi", pendaftar)).format("DD MMMM YYYY")
               )}
               {h.parse("wajib_ipk", pendaftar) === "t" && (
                  <React.Fragment>
                     {h.detail_label("Minimal IPK", h.parse("minimal_ipk", pendaftar))}
                     {h.detail_label("Maksimal IPK", h.parse("maksimal_ipk", pendaftar))}
                  </React.Fragment>
               )}
            </Col>
         </Row>
         <h5 className="mt-10">Lampiran</h5>
         <Table responsive hover size="sm">
            <thead>
               <tr>
                  <th className="text-center">NO</th>
                  <th>KETERANGAN</th>
                  <th>BUKTI</th>
               </tr>
            </thead>
            <tbody>
               <Each
                  of={lampiranUpload}
                  render={(row, index) => (
                     <tr>
                        <td className="text-center">{index + 1}</td>
                        <td>{h.parse("nama", row)}</td>
                        <td>{renderBukti(h.parse("id", row), lampiranYangDiupload)}</td>
                     </tr>
                  )}
               />
            </tbody>
         </Table>
      </Card.Body>
   );
};
export default InformasiPendaftaranBeasiswa;
