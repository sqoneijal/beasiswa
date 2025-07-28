import moment from "moment";
import { Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
moment.locale("id");

const InformasiPendaftaran = () => {
   const { module } = useSelector((e) => e.redux);
   const { informasiPendaftaran } = module;
   const { angkatanBeasiswa, lampiranUploadBeasiswa, lampiranYangDiUpload } = informasiPendaftaran;

   const wajibIPK = (value) => {
      return value === "t" ? "Iya" : "Tidak";
   };

   const renderBukti = (lampiran, id) => {
      if (typeof lampiran[id] !== "undefined") {
         return (
            <a href={h.parse("file_path", lampiran[id])} target="_blank">
               {h.parse("orig_name", lampiran[id])}
            </a>
         );
      }
   };

   return (
      <Row>
         <Col>
            <h4>Keterangan Beasiswa</h4>
            {h.detail_label("Tanggal Mulai Pendaftaran", moment(h.parse("tanggal_mulai", informasiPendaftaran)).format("DD MMMM YYYY"))}
            {h.detail_label("Tanggal Akhir Pendaftaran", moment(h.parse("tanggal_akhir", informasiPendaftaran)).format("DD MMMM YYYY"))}
            {h.detail_label("Wajib IPK", wajibIPK(h.parse("wajib_ipk", informasiPendaftaran)))}
            {h.detail_label("Minimal IPK", h.parse("minimal_ipk", informasiPendaftaran))}
            {h.detail_label("Maksimal IPK", h.parse("maksimal_ipk", informasiPendaftaran))}
            {h.detail_label("Jenis Beasiswa", h.parse("nama_kategori_beasiswa", informasiPendaftaran))}
            {h.detail_label("Keterangan Jenis Beasiswa", h.parse("keterangan_kategori_beasiswa", informasiPendaftaran))}
         </Col>
         <Col md={2} sm={2} xs={12}>
            <h4>Untuk Angkatan</h4>
            <ul>
               <Each of={angkatanBeasiswa} render={(row) => <li>{h.parse("angkatan", row)}</li>} />
            </ul>
         </Col>
         <Col>
            <h4>Lampiran</h4>
            <Table responsive hover size="sm">
               <thead>
                  <tr>
                     <th>keterangan</th>
                     <th>bukti</th>
                  </tr>
               </thead>
               <tbody>
                  <Each
                     of={lampiranUploadBeasiswa}
                     render={(row) => (
                        <tr>
                           <td>{h.parse("nama", row)}</td>
                           <td>{renderBukti(lampiranYangDiUpload, h.parse("id_lampiran_upload", row))}</td>
                        </tr>
                     )}
                  />
               </tbody>
            </Table>
         </Col>
      </Row>
   );
};
export default InformasiPendaftaran;
