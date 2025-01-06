import React, { useState } from "react";
import { ButtonGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const PreviewHasilImport = ({ frontState, setFrontState }) => {
   const { module, init } = useSelector((e) => e.redux);
   const { daftarPreviewImport, periodeAktif } = module;
   const dispatch = useDispatch();

   const [state, setState] = useState({
      isLoadingValidasi: false,
      statusValidasi: false,
      isLoadingImport: false,
   });

   const renderKeterangan = (data) => {
      if (data.is_aktif === "f") {
         return `Mahasiswa ini sudah mendaftar pada jenis beasiswa ${data.nama_beasiswa} dengan status akhir ${data.status_validasi}.`;
      } else if (data.is_aktif === "t") {
         return `Mahasiswa ini sudah mendaftar pada jenis beasiswa ${data.nama_beasiswa} dengan status aktif sebagai penerima beasiswa.`;
      }
      return "";
   };

   const handleValidasi = (daftarPreviewImport) => {
      const nim = [];
      daftarPreviewImport.forEach((element) => {
         nim.push(element.nim);
      });

      if (!h.arrLength(nim)) {
         return;
      }

      const formData = { nim: JSON.stringify(nim) };

      setState((prev) => ({ ...prev, isLoadingValidasi: true }));
      const fetch = h.post(`/beasiswa/penerima/validasiimportexcel`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         const updateDaftarPreview = [];
         daftarPreviewImport.forEach((row) => {
            if (typeof data[row.nim] === "undefined") {
               updateDaftarPreview.push({
                  ...row,
               });
            } else {
               updateDaftarPreview.push({
                  ...row,
                  keterangan: renderKeterangan(data[row.nim]),
               });
            }
         });

         dispatch(setModule({ ...module, daftarPreviewImport: updateDaftarPreview }));
      });
      fetch.finally(() => {
         setState((prev) => ({ ...prev, isLoadingValidasi: false, statusValidasi: true }));
      });
   };

   const handleCheckAll = (checked, daftarPreviewImport) => {
      const updateDaftarPreview = [];
      daftarPreviewImport.forEach((row) => {
         updateDaftarPreview.push({ ...row, checked });
      });
      dispatch(setModule({ ...module, daftarPreviewImport: updateDaftarPreview }));
   };

   const handleChecked = (checked, row, daftarPreviewImport) => {
      const updateDaftarPreview = [];
      daftarPreviewImport.forEach((element) => {
         if (element.nim === row.nim) {
            updateDaftarPreview.push({ ...element, checked });
         } else {
            updateDaftarPreview.push({ ...element });
         }
      });
      dispatch(setModule({ ...module, daftarPreviewImport: updateDaftarPreview }));
   };

   const handleImportData = (daftarPreviewImport) => {
      let jumlahChecked = 0;
      daftarPreviewImport.forEach((element) => {
         if (element.checked) jumlahChecked++;
      });

      if (jumlahChecked > 0) {
         const formData = {
            user_modified: init.preferred_username,
            data: JSON.stringify(daftarPreviewImport),
            jenis_beasiswa: h.parse("jenis_beasiswa", frontState),
            periode: h.parse("id", periodeAktif),
         };

         setState((prev) => ({ ...prev, isLoadingImport: true }));
         const fetch = h.post(`/beasiswa/penerima/submitimport`, formData);
         fetch.then((res) => {
            if (typeof res === "undefined") return;

            const { data } = res;
            if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
               h.notification(false, h.parse("message", data));
               return;
            }

            setFrontState((prev) => ({ ...prev, errors: data.errors }));
            h.notification(data.status, data.msg_response);

            if (!data.status) return;

            dispatch(setModule({ ...module, daftarPreviewImport: [] }));
         });
         fetch.finally(() => {
            setState((prev) => ({ ...prev, isLoadingImport: false }));
         });
         return;
      }

      return h.notification(false, "Tidak ada data yang dipilih");
   };

   return (
      <React.Fragment>
         <Table responsive hover className="align-middle table-row-dashed fs-6" size="sm">
            <thead>
               <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                  {state.statusValidasi && (
                     <th className="text-center">
                        <input type="checkbox" className="form-check-input" onChange={(e) => handleCheckAll(e.target.checked, daftarPreviewImport)} />
                     </th>
                  )}
                  <th className="text-center">no</th>
                  <th>nim</th>
                  <th>nama mahasiswa</th>
                  <th>keterangan</th>
               </tr>
            </thead>
            <tbody>
               {h.arrLength(daftarPreviewImport) ? (
                  <Each
                     of={daftarPreviewImport}
                     render={(row, index) => (
                        <tr className={row.keterangan ? "bg-warning text-dark" : ""}>
                           {state.statusValidasi && (
                              <th className="text-center">
                                 <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={row.checked}
                                    onChange={(e) => handleChecked(e.target.checked, row, daftarPreviewImport)}
                                 />
                              </th>
                           )}
                           <td className="text-center">{index + 1}</td>
                           <td>{h.parse("nim", row)}</td>
                           <td>{h.parse("nama", row)}</td>
                           <td>{h.parse("keterangan", row)}</td>
                        </tr>
                     )}
                  />
               ) : (
                  <tr>
                     <td colSpan={4} className="text-center">
                        Tidak ada data
                     </td>
                  </tr>
               )}
            </tbody>
         </Table>
         {h.arrLength(daftarPreviewImport) &&
            h.save_button(
               <ButtonGroup>
                  {h.buttons("Validasi", state.isLoadingValidasi, {
                     onClick: () => handleValidasi(daftarPreviewImport),
                  })}
                  {state.statusValidasi &&
                     h.buttons("Import Data", state.isLoadingImport, {
                        variant: "success",
                        onClick: () => handleImportData(daftarPreviewImport),
                     })}
               </ButtonGroup>,
               12,
               10
            )}
      </React.Fragment>
   );
};
export default PreviewHasilImport;
