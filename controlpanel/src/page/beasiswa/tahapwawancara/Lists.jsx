import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import writeXlsxFile from "write-excel-file";
import * as h from "~/Helpers";
import { setFilter, setModule } from "~/redux";
moment.locale("id");

let datatable;

const Lists = ({ setPageTypeButton }) => {
   const { filter, module } = useSelector((e) => e.redux);
   const { daftarPeriode } = module;
   const dispatch = useDispatch();

   // bool
   const [grepStatusDownload, setGrepStatusDownload] = useState(false);

   // array
   const [daftarDownload, setDaftarDownload] = useState([]);

   useLayoutEffect(() => {
      if (!grepStatusDownload && h.arrLength(daftarDownload)) {
         const firstArray = [
            "NIM",
            "Nama Mahasiswa",
            "Program Studi",
            "Periode Masuk",
            "Sistem Kuliah",
            "Jenis Pendaftaran",
            "Jalur Pendaftaran",
            "Gelombang",
            "Tanggal Masuk",
            "Informasi Umum",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "Domisili",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "Orang Tua",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
         ];

         const secondArray = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "Umum",
            null,
            null,
            null,
            null,
            "Administrasi",
            null,
            null,
            null,
            null,
            null,
            "Kontak",
            null,
            null,
            null,
            null,
            "Pekerjaan",
            null,
            null,
            "Bank",
            null,
            null,
            "KTP",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "Domisili",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "Biodata Ayah",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "Biodata Ibu",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
         ];

         const thirdArray = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "Jenis Kelamin",
            "Tempat Lahir",
            "Tanggal Lahir",
            "Agama",
            "Transportasi",
            "Kewarganegaraan",
            "NIK/No. KTP",
            "Paspor",
            "No. KK",
            "No. KPS",
            "Status Nikah",
            "No. Telepon",
            "No. HP",
            "Kepemilikan",
            "Email Kampus",
            "Email Pribadi",
            "Pekerjaan",
            "Instansi Pekerjaan",
            "Penghasilan",
            "No. Rekening",
            "Nama Rekening",
            "Nama Bank",
            "Alamat",
            "RT",
            "RW",
            "Dusun",
            "Desa/Kelurahan",
            "Provinsi",
            "Kota",
            "Kecamatan",
            "Kode Pos",
            "Alamat",
            "RT",
            "RW",
            "Dusun",
            "Desa/Kelurahan",
            "Provinsi",
            "Kota",
            "Kecamatan",
            "Kode Pos",
            "Nama Lengkap",
            "NIK",
            "Tanggal Lahir",
            "Status Hidup",
            "Status Kekerabatan",
            "Pendidikan Terakhir",
            "Pekerjaan",
            "Penghasilan",
            "Alamat",
            "No. Telepon",
            "Alamat Email",
            "Nama Lengkap",
            "NIK",
            "Tanggal Lahir",
            "Status Hidup",
            "Status Kekerabatan",
            "Pendidikan Terakhir",
            "Pekerjaan",
            "Penghasilan",
            "Alamat",
            "No. Telepon",
            "Alamat Email",
         ];

         // daftarDownload.forEach((row) => {
         //    row.informasi_beasiswa.lampiranUploadBeasiswa.forEach((item) => {
         //       firstArray.push(null);
         //       secondArray.push(null);
         //       thirdArray.push(item.nama);
         //    });
         // });

         const createFirstHeader = (array, data = {}) => {
            return array.map((item) => {
               if (!item) return item;

               let span = 0;
               let rowSpan = 0;
               if (item === "Informasi Umum" || item === "Orang Tua") span = 22;
               else if (item === "Domisili") span = 18;
               else rowSpan = 3;

               return {
                  value: item,
                  fontWeight: "bold",
                  alignVertical: "middle",
                  align: "center",
                  span,
                  rowSpan,
                  type: String,
               };
            });
         };

         const createSecondHeader = (array, data = {}) => {
            return array.map((item) => {
               if (!item) return item;

               let span = 0;
               let rowSpan = 0;

               if (item === "Umum" || item === "Kontak") span = 5;
               else if (item === "Administrasi") span = 6;
               else if (item === "Pekerjaan" || item === "Bank") span = 3;
               else if (item === "KTP" || item === "Domisili") span = 9;
               else if (item === "Biodata Ayah" || item === "Biodata Ibu") span = 11;
               else if (item === "Jenis Beasiswa" || item === "Tanggal Daftar") rowSpan = 2;

               return {
                  value: item,
                  fontWeight: "bold",
                  alignVertical: "middle",
                  align: "center",
                  span,
                  rowSpan,
                  type: String,
               };
            });
         };

         const createThirdHeader = (array) => {
            return array.map((item) => {
               if (!item) return item;

               return {
                  value: item,
                  fontWeight: "bold",
                  alignVertical: "middle",
                  align: "center",
                  type: String,
               };
            });
         };

         const firstHeader = createFirstHeader(firstArray);
         const secondHeader = createSecondHeader(secondArray);
         const thirdHeader = createThirdHeader(thirdArray);

         const values = [];
         daftarDownload.forEach((row) => {
            values.push([
               {
                  type: String,
                  value: row.nim,
               },
               {
                  type: String,
                  value: row.nama,
               },
               {
                  type: String,
                  value: row.program_studi,
               },
               {
                  type: String,
                  value: h.periode(row.id_periode),
               },
               {
                  type: String,
                  value: row.sistem_kuliah,
               },
               null,
               {
                  type: String,
                  value: row.jalur_pendaftaran,
               },
               {
                  type: String,
                  value: row.gelombang,
               },
               { type: String, value: moment(row.tanggal_daftar).format("DD-MM-YYYY") },
               {
                  type: String,
                  value: row.jenis_kelamin,
               },
               {
                  type: String,
                  value: row.tempat_lahir,
               },
               {
                  type: String,
                  value: moment(row.tanggal_lahir).format("DD MMMM YYYY"),
               },
               {
                  type: String,
                  value: row.agama,
               },
               null,
               {
                  type: String,
                  value: row.nama_negara,
               },
               {
                  type: String,
                  value: row.nik,
               },
               null,
               {
                  type: String,
                  value: row.nomor_kk,
               },
               {
                  type: String,
                  value: row.nomor_kps,
               },
               {
                  type: String,
                  value: row.status_nikah,
               },
               {
                  type: String,
                  value: row.telepon,
               },
               {
                  type: String,
                  value: row.hp,
               },
               null,
               {
                  type: String,
                  value: row.email_kampus,
               },
               {
                  type: String,
                  value: row.email,
               },
               {
                  type: String,
                  value: row.pekerjaan,
               },
               null,
               null,
               null,
               null,
               null,
               {
                  type: String,
                  value: row.alamat,
               },
               {
                  type: String,
                  value: row.rt,
               },
               {
                  type: String,
                  value: row.rw,
               },
               {
                  type: String,
                  value: row.dusun,
               },
               {
                  type: String,
                  value: row.desa,
               },
               {
                  type: String,
                  value: row.provinsi,
               },
               {
                  type: String,
                  value: row.kota,
               },
               {
                  type: String,
                  value: row.kecamatan,
               },
               {
                  type: String,
                  value: row.kode_pos,
               },
               {
                  type: String,
                  value: row.alamat_domisili,
               },
               {
                  type: String,
                  value: row.rt_domisili,
               },
               {
                  type: String,
                  value: row.rw_domisili,
               },
               {
                  type: String,
                  value: row.dusun_domisili,
               },
               {
                  type: String,
                  value: row.desa_domisili,
               },
               {
                  type: String,
                  value: row.provinsi_domisili,
               },
               {
                  type: String,
                  value: row.kota_domisili,
               },
               {
                  type: String,
                  value: row.kecamatan_domisili,
               },
               { type: String, value: row.kode_pos_domisili },
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               null,
               // { type: String, value: row.informasi_beasiswa.nama_kategori_beasiswa },
               // { type: String, value: moment(row.informasi_beasiswa.tanggal_daftar).format("DD-MM-YYYY") },
            ]);
         });

         const data = [firstHeader, secondHeader, thirdHeader, ...values];

         writeXlsxFile(data, {
            fileName: "tahap_wawancara.xlsx",
         });
      }
      return () => {};
   }, [grepStatusDownload, daftarDownload]);

   const grepDataFromSevima = (content, index, target_button) => {
      if (typeof content[index] === "undefined") {
         setGrepStatusDownload(false);
         target_button.innerHTML = `<span class="indicator-label">Download Excel</span>`;
         target_button.parentElement.disabled = false;
         return;
      }

      const formData = { nim: content[index].nim, periode: filter.periode };

      const fetch = h.post(`/beasiswa/tahapwawancara/grepdatafromsevima`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            setGrepStatusDownload(false);
            target_button.innerHTML = `<span class="indicator-label">Download Excel</span>`;
            target_button.parentElement.disabled = false;
            return;
         }

         setDaftarDownload((prev) => [...prev, data]);

         setTimeout(() => {
            grepDataFromSevima(content, index + 1, target_button);
         }, 3000);
      });
   };

   const handleDownloadExcel = (target_button) => {
      setGrepStatusDownload(true);
      target_button.innerHTML = `<span class="indicator-label">Loading...</span>`;
      target_button.parentElement.disabled = true;

      const fetch = h.get(`/beasiswa/tahapwawancara/downloadexcel`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         if (h.arrLength(data)) {
            grepDataFromSevima(data, 0, target_button);
         } else {
            target_button.innerHTML = `<span class="indicator-label">Download Excel</span>`;
            target_button.parentElement.disabled = false;
         }
      });
   };

   const base_url_datatable = "/beasiswa/tahapwawancara/getdata";
   const datatable_url = `/${base_url_datatable}?${h.serialize(filter)}`;
   datatable = h.initDatatable({
      show_edit_button: false,
      show_delete_button: false,
      url: datatable_url,
      columns: [
         { targets: 1, data: "nim" },
         { targets: 2, data: "nama" },
         { targets: 3, data: "jenis_beasiswa" },
         {
            targets: 4,
            data: null,
            render: (data) => {
               return moment(h.parse("modified", data)).format("DD MMMM YYYY");
            },
         },
         { targets: 4, data: null, visible: true },
      ],
      columnDefs: true,
      createdRow: (row, data) => {
         const _view = row.querySelector("#view");
         if (_view) {
            _view.onclick = (e) => {
               e.preventDefault();
               dispatch(setModule({ ...module, openDetail: true, detailContent: data }));
            };
         }
      },
      initComplete: () => {
         const container = document.querySelector("div.custom_filter");
         const dt_action = document.querySelector("div.dt-action-buttons");

         const select = document.createElement("select");
         select.className = "form-select";
         select.innerHTML = '<option value="">Periode</option>';

         const sortedData = [...daftarPeriode].sort((a, b) => {
            return b.nama_periode.localeCompare(a.nama_periode);
         });

         sortedData.forEach((row) => {
            const option = document.createElement("option");
            option.value = row.nama_singkat;
            option.textContent = row.nama_periode;
            option.selected = row.nama_singkat === filter.periode;
            select.appendChild(option);
         });

         select.onchange = (e) => {
            const value = e.target.value;
            h.handleFilterDatatable(base_url_datatable, { ...filter, periode: value });
            dispatch(setFilter({ ...filter, periode: value }));
         };

         const button = document.createElement("button");
         button.type = "submit";
         button.id = "terima";
         button.name = "terima";
         button.className = "fw-bold border-0 waves-effect waves-light btn btn-primary";
         button.innerHTML = `<span class="indicator-label">Download Excel</span>`;

         button.onclick = (e) => {
            e.preventDefault();
            handleDownloadExcel(e.target);
         };

         container.appendChild(select);
         dt_action.appendChild(button);
      },
   });

   useLayoutEffect(() => {
      setPageTypeButton("");
      datatable.init();
      return () => {};
   }, []);

   return (
      <div className="card-datatable table-responsive">
         <Table className="datatables-permissions border-top" id="datatable">
            <thead>
               <tr>
                  <th>nim</th>
                  <th>nama</th>
                  <th>jenis beasiswa</th>
                  <th>tanggal</th>
                  <th />
               </tr>
            </thead>
         </Table>
      </div>
   );
};
export default Lists;
