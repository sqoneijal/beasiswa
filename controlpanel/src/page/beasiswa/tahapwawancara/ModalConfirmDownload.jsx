import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import writeXlsxFile from "write-excel-file";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const ModalConfirmDownload = () => {
   const { module } = useSelector((e) => e.redux);
   const { openModalDownload, daftarPeriode, daftarJenisBeasiswa } = module;
   const dispatch = useDispatch();

   const [state, setState] = useState({
      input: {},
      errors: {},
      isLoadingDownload: false,
   });

   const clearProps = () => {
      dispatch(setModule({ ...module, openModalDownload: false }));
      setState({ input: {}, errors: {} });
   };

   const createHeaderRow = (daftarLampiran) => {
      const HEADER_ROW = [
         { value: "NAMA MAHASISWA", fontWeight: "bold" },
         { value: "NIM", fontWeight: "bold" },
         { value: "TEMPAT LAHIR", fontWeight: "bold" },
         { value: "TANGGAL LAHIR", fontWeight: "bold" },
         { value: "NIK", fontWeight: "bold" },
         { value: "ALAMAT", fontWeight: "bold" },
         { value: "HP", fontWeight: "bold" },
         { value: "INVOICE", fontWeight: "bold" },
         { value: "TANGGAL BAYAR", fontWeight: "bold" },
         { value: "JUMLAH BAYAR", fontWeight: "bold" },
         { value: "EMAIL", fontWeight: "bold" },
         { value: "PROGRAM STUDI", fontWeight: "bold" },
         { value: "IPK", fontWeight: "bold" },
         { value: "NISN", fontWeight: "bold" },
      ];

      daftarLampiran.forEach((row) => {
         HEADER_ROW.push({ value: row.nama, fontWeight: "bold" });
      });

      return HEADER_ROW;
   };

   const createDataRow = (mahasiswa, daftarLampiran) => {
      return mahasiswa.map((row) => {
         const setRowLampiran = daftarLampiran.map((item) => {
            const lampiran = row.lampiran_upload?.[item.id];
            return {
               value: lampiran ? `https://lh3.googleusercontent.com/d/${lampiran.google_drive_id}?authuser=1/view` : "N/A",
            };
         });

         return [
            { type: String, value: row.nama_mahasiswa },
            { type: String, value: row.nim },
            { type: String, value: row.tempat_lahir },
            { type: String, value: row.tanggal_lahir },
            { type: String, value: row.nik },
            { type: String, value: row.alamat },
            { type: String, value: row.hp },
            { type: String, value: row.invoice },
            { type: String, value: row.tanggal_bayar },
            { type: String, value: row.jumlah_bayar },
            { type: String, value: row.email },
            { type: String, value: row.prodi },
            { type: String, value: row.ipk },
            { type: String, value: row.nisn },
            ...setRowLampiran,
         ];
      });
   };

   const handleDownload = () => {
      const formData = {};
      Object.keys(state.input).forEach((key) => (formData[key] = state.input[key]));

      setState((prev) => ({ ...prev, isLoadingDownload: true }));
      const fetch = h.post(`/beasiswa/tahapwawancara/download`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         const HEADER_ROW = createHeaderRow(data.daftar_lampiran);
         const DATA_ROW = createDataRow(data.mahasiswa, data.daftar_lampiran);

         const content = [HEADER_ROW, ...DATA_ROW];

         writeXlsxFile(content, {
            orientation: "landscape",
            fileName: "tahapwawancara_beasiswa.xlsx",
         });
      });
      fetch.finally(() => {
         setState((prev) => ({ ...prev, isLoadingDownload: false }));
      });
   };

   return (
      <Modal show={openModalDownload} onHide={clearProps} backdrop="static">
         <Modal.Header closeButton>
            <Modal.Title>Konfirmasi Download</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {h.form_select(
               "Periode",
               "periode",
               3,
               daftarPeriode.map((row) => ({ value: row.id, label: h.periode(row.id) })),
               {
                  onChange: (e) => setState((prev) => ({ ...prev, input: { ...state.input, periode: e.target.value, jenis_beasiswa: "" } })),
               },
               state.errors
            )}
            {h.form_select(
               "Jenis Beasiswa",
               "jenis_beasiswa",
               3,
               daftarJenisBeasiswa
                  .filter((e) => h.toInt(e.periode) === h.toInt(state.input.periode))
                  .map((row) => ({ value: h.parse("id_generate_beasiswa", row), label: h.parse("nama", row) })),
               {
                  onChange: (e) => setState((prev) => ({ ...prev, input: { ...state.input, jenis_beasiswa: e.target.value } })),
               },
               state.errors
            )}
         </Modal.Body>
         <Modal.Footer>
            {h.parse("periode", state.input) &&
               h.parse("jenis_beasiswa", state.input) &&
               h.buttons("Download", state.isLoadingDownload, {
                  disabled: state.isLoadingDownload,
                  onClick: () => (state.isLoadingDownload ? null : handleDownload()),
               })}
         </Modal.Footer>
      </Modal>
   );
};
export default ModalConfirmDownload;
