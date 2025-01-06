import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const ModalConfirmDownload = () => {
   const { module } = useSelector((e) => e.redux);
   const { openModalDownload, daftarPeriode, daftarGenerateBeasiswa } = module;
   const dispatch = useDispatch();

   const [state, setState] = useState({
      input: {},
      errors: {},
   });

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   const clearProps = () => {
      dispatch(setModule({ ...module, openModalDownload: false }));
   };

   const submit = () => {};

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
               daftarGenerateBeasiswa
                  .filter((e) => h.toInt(e.periode) === h.toInt(state.input.periode))
                  .map((row) => ({ value: h.parse("id_generate_beasiswa", row), label: h.parse("jenis_beasiswa", row) })),
               {
                  onChange: (e) => console.log(e.target.value),
               },
               state.errors
            )}
         </Modal.Body>
      </Modal>
   );
};
export default ModalConfirmDownload;
