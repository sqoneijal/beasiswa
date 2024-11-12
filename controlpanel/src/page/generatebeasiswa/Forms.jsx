import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Forms = ({ setPageTypeButton }) => {
   const { module, init } = useSelector((e) => e.redux);
   const { pageType, kategoriBeasiswa, lampiranUpload, periode } = module;
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [input, setInput] = useState({});
   const [errors, setErrors] = useState({});

   // array
   const [selectedAngkatan, setSelectedAngkatan] = useState([]);
   const [selectedLampiranUpload, setSelectedLampiranUpload] = useState([]);

   const clearProps = () => {
      setInput({});
      setErrors({});
      setIsSubmit(false);
      dispatch(setModule({ ...module, pageType: "", detailContent: {} }));
   };

   useLayoutEffect(() => {
      setPageTypeButton(
         h.buttons("Batal", false, {
            onClick: () => clearProps(),
            variant: "danger",
         })
      );
      return () => {};
   }, []);

   const getPeriodeAktif = (daftar) => {
      let output = null;
      daftar.forEach((item) => {
         if (h.parse("is_aktif", item) === 1) {
            output = h.parse("nama_singkat", item);
         }
      });
      return output;
   };

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         user_modified: init.preferred_username,
         pageType,
         angkatan: h.arrLength(selectedAngkatan) ? JSON.stringify(selectedAngkatan) : "",
         lampiran_upload: h.arrLength(selectedLampiranUpload) ? JSON.stringify(selectedLampiranUpload) : "",
         periode: getPeriodeAktif(periode),
      };
      Object.keys(input).forEach((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      const fetch = h.post(`/generatebeasiswa/submit`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setErrors(data.errors);
         h.notification(data.status, data.msg_response);

         if (!data.status) return;

         clearProps();
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   const daftarAngkatan = [];
   for (let year = moment().year(); year >= moment().year() - 10; year--) {
      daftarAngkatan.push({ id: year, label: year });
   }

   return (
      <Form onSubmit={isSubmit ? null : submit}>
         {pageType === "add" && (
            <div className="alert alert-outline-primary" role="alert">
               Jika ingin menambahkan jadwal pendaftaran beasiswa baru, maka periode pendaftaran akan dicatat secara otomatis berdasarkan periode yang
               aktif.
            </div>
         )}
         <Row>
            <Col>
               {h.date_picker(
                  "Tanggal Mulai",
                  "tanggal_mulai",
                  3,
                  {
                     onChange: ([date]) => setInput((prev) => ({ ...prev, tanggal_mulai: moment(date).format("YYYY-MM-DD") })),
                     value: h.parse("tanggal_mulai", input),
                  },
                  errors
               )}
            </Col>
            <Col>
               {h.date_picker(
                  "Tanggal Akhir",
                  "tanggal_akhir",
                  3,
                  {
                     onChange: ([date]) => setInput((prev) => ({ ...prev, tanggal_akhir: moment(date).format("YYYY-MM-DD") })),
                     value: h.parse("tanggal_akhir", input),
                  },
                  errors
               )}
            </Col>
         </Row>
         <Row>
            <Col>
               {h.form_multiple(
                  "Angkatan",
                  "angkatan",
                  3,
                  {
                     labelKey: (e) => e.label.toString(),
                     options: daftarAngkatan,
                     selected: selectedAngkatan,
                     onChange: setSelectedAngkatan,
                  },
                  errors
               )}
            </Col>
            <Col>
               {h.form_select(
                  "Apakah wajib IPK?",
                  "wajib_ipk",
                  3,
                  [
                     { value: "t", label: "Iya" },
                     { value: "f", label: "Tidak" },
                  ],
                  {
                     onChange: (e) => setInput((prev) => ({ ...prev, wajib_ipk: e.target.value })),
                  },
                  errors
               )}
            </Col>
         </Row>
         {h.parse("wajib_ipk", input) === "t" && (
            <Row>
               <Col>
                  {h.form_text(
                     "Minimal IPK",
                     "minimal_ipk",
                     3,
                     {
                        value: h.parse("minimal_ipk", input),
                        onChange: (e) => {
                           const value = e.target.value.toString().replace(",", ".");
                           setInput((prev) => ({ ...prev, minimal_ipk: value }));
                        },
                     },
                     errors
                  )}
               </Col>
               <Col>
                  {h.form_text(
                     "Maksimal IPK",
                     "maksimal_ipk",
                     3,
                     {
                        value: h.parse("maksimal_ipk", input),
                        onChange: (e) => {
                           const value = e.target.value.toString().replace(",", ".");
                           setInput((prev) => ({ ...prev, maksimal_ipk: value }));
                        },
                     },
                     errors
                  )}
               </Col>
            </Row>
         )}
         <Row>
            <Col>
               {h.form_select(
                  "Kategori Beasiswa",
                  "id_kategori_beasiswa",
                  3,
                  kategoriBeasiswa.map((row) => ({ value: h.parse("id", row), label: h.parse("nama", row) })),
                  {
                     onChange: (e) => setInput((prev) => ({ ...prev, id_kategori_beasiswa: e.target.value })),
                     value: h.parse("id_kategori_beasiswa", input),
                  },
                  errors
               )}
            </Col>
            <Col>
               {h.form_multiple(
                  "Lampiran Upload",
                  "lampiran_upload",
                  3,
                  {
                     labelKey: (e) => e.label.toString(),
                     options: lampiranUpload.map((row) => ({ id: h.parse("id", row), label: h.parse("nama", row) })),
                     selected: selectedLampiranUpload,
                     onChange: setSelectedLampiranUpload,
                  },
                  errors
               )}
            </Col>
         </Row>
         {h.save_button(h.buttons("Simpan", isSubmit))}
      </Form>
   );
};
export default Forms;
